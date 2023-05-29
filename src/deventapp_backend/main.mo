import Type "Types";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Order "mo:base/Order";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Error "mo:base/Error";

actor class EventWall() {
  type EventId = Nat;
  type Event = Type.Event;
  type EventDetails = Type.EventDetails;
  type State = Type.State;
  type Category = Type.Category;

  func _natHash(n : Nat) : Hash.Hash {
    Text.hash(Nat.toText(n));
  };

  stable var eventIdCounter : Nat = 0;
  let wall = HashMap.HashMap<Nat, Event>(1, Nat.equal, _natHash);

  public shared ({ caller }) func createEvent(
    title : Text,
    description : Text,
    category : Category,
    date : Time.Time,
    location : ?Text,
  ) : async Result.Result<Nat, Text> {
    //if (Principal.isAnonymous(caller)) return #err("You need to be logged in to create an event");

    let id = eventIdCounter;
    eventIdCounter += 1;

    let newEvent : Event = {
      details : EventDetails = {
        title = title;
        //image = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80";
        location = Option.get(location, "Online");
        description = description;
        category = category;
        date = date;
      };
      participants = [];
      favorites = [];
      creator = caller;
      state = #open;
    };

    try {
      wall.put(id, newEvent);
      return #ok(id);

    } catch (error) {
      return #err("Error: Unable to create event. " # Error.message(error));
    };

  };

  public shared ({ caller }) func deleteEvent(eventId : Nat) : async Result.Result<(), Text> {
    //if (Principal.isAnonymous(caller)) return #err("You need to be logged in to delete an event");

    let event = wall.get(eventId);
    switch (event) {
      case (?currentEvent) {
        if (not Principal.equal(currentEvent.creator, caller)) return #err("Error: Unable to delete event. You are not the creator of this event.");

        try {
          wall.delete(eventId);
          #ok(());
        } catch (error) {
          #err("Error: Unable to delete event. " # Error.message(error));
        };
      };
      case (null) {
        #err("Error: Unable to delete event. Event not found.");
      };
    };
  };

  public shared ({ caller }) func editEventDetails(eventId : Nat, eventDetails : EventDetails) : async Result.Result<(), Text> {
    //if (Principal.isAnonymous(caller)) return #err("You need to be logged in to edit an event");

    let event = wall.get(eventId);
    switch (event) {
      case (?currentEvent) {
        if (not Principal.equal(currentEvent.creator, caller)) return #err("Error: Unable to edit event. You are not the creator of this event.");

        let updatedEvent : Event = {
          details = eventDetails;
          participants = currentEvent.participants;
          favorites = currentEvent.favorites;
          creator = currentEvent.creator;
          state = currentEvent.state;
        };

        return updateEvent(eventId, updatedEvent);

      };
      case (null) {
        #err("Error: Unable to edit event. Event not found.");
      };
    };
  };

  public func getAllEventsSortedByTime() : async [Event] {
    let events = Iter.toArray(wall.vals());
    let result = Array.sort<Event>(
      events,
      compareEvents,
    );
    return result;
  };

  public shared ({ caller }) func participateEvent(eventId : Nat) : async Result.Result<(), Text> {
    let event = getEvent(eventId);
    switch (event) {
      case (#ok(currentEvent)) {
        let participants : Buffer.Buffer<Principal> = Buffer.fromArray(currentEvent.participants);

        if (Buffer.contains<Principal>(participants, caller, Principal.equal)) return #err("Error: You are already participating in this event.");

        participants.add(caller);

        let updatedEvent : Event = {
          details = currentEvent.details;
          participants = Buffer.toArray(participants);
          favorites = currentEvent.favorites;
          creator = currentEvent.creator;
          state = currentEvent.state;
        };

        return updateEvent(eventId, updatedEvent);

      };
      case (#err(error)) {
        return #err("Error: Unable to add participant to event. " # error);
      };
    };
  };

  public shared ({ caller }) func unparticipateEvent(eventId : Nat) : async Result.Result<(), Text> {
    let event = getEvent(eventId);
    switch (event) {
      case (#ok(currentEvent)) {
        let participants : Buffer.Buffer<Principal> = Buffer.fromArray(currentEvent.participants);

        if (not Buffer.contains<Principal>(participants, caller, Principal.equal)) return #err("Error: You are not participating in this event.");

        participants.filterEntries(func(_, participantId) = participantId != caller);

        let updatedEvent : Event = {
          details = currentEvent.details;
          participants = Buffer.toArray(participants);
          favorites = currentEvent.favorites;
          creator = currentEvent.creator;
          state = currentEvent.state;
        };

        return updateEvent(eventId, updatedEvent);

      };
      case (#err(error)) {
        return #err("Error: Unable to add participant to event. " # error);
      };
    };
  };

  public shared ({ caller }) func favoriteEvent(eventId : Nat) : async Result.Result<(), Text> {
    let event = getEvent(eventId);
    switch (event) {
      case (#ok(currentEvent)) {
        let favorites : Buffer.Buffer<Principal> = Buffer.fromArray(currentEvent.favorites);

        if (Buffer.contains<Principal>(favorites, caller, Principal.equal)) return #err("Error: You have already favorited this event.");

        favorites.add(caller);

        let updatedEvent : Event = {
          details = currentEvent.details;
          participants = currentEvent.participants;
          favorites = Buffer.toArray(favorites);
          creator = currentEvent.creator;
          state = currentEvent.state;
        };

        return updateEvent(eventId, updatedEvent);

      };
      case (#err(error)) {
        return #err("Error: Unable to add participant to event. " # error);
      };
    };
  };

  public shared ({ caller }) func unfavoriteEvent(eventId : Nat) : async Result.Result<(), Text> {
    let event = getEvent(eventId);
    switch (event) {
      case (#ok(currentEvent)) {
        let favorites : Buffer.Buffer<Principal> = Buffer.fromArray(currentEvent.favorites);

        if (not Buffer.contains<Principal>(favorites, caller, Principal.equal)) return #err("Error: You have not favorited this event.");

        favorites.filterEntries(func(_, participantId) = participantId != caller);

        let updatedEvent : Event = {
          details = currentEvent.details;
          participants = currentEvent.participants;
          favorites = Buffer.toArray(favorites);
          creator = currentEvent.creator;
          state = currentEvent.state;
        };

        return updateEvent(eventId, updatedEvent);

      };
      case (#err(error)) {
        return #err("Error: Unable to add participant to event. " # error);
      };
    };
  };

  private func getEvent(eventId : Nat) : Result.Result<Event, Text> {
    let event = wall.get(eventId);
    switch (event) {
      case (?value) { #ok(value) };
      case (null) {
        #err("Error: Unable to retrieve event. Event not found.");
      };
    };
  };

  private func updateEvent(eventId : Nat, newEvent : Event) : Result.Result<(), Text> {
    let event = getEvent(eventId);

    switch (event) {
      case (#ok(currentEvent)) {
        wall.put(eventId, newEvent);
        #ok(());
      };
      case (#err(error)) {
        #err("Error: Unable to update event. " # error);
      };

    };
  };

  private func compareEvents(event1 : Event, event2 : Event) : Order.Order {
    return Int.compare(event2.details.date, event1.details.date);
  };

};
