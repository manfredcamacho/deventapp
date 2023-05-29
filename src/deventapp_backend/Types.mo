import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";

module {
  public type Category = {
    #sport;
    #music;
    #party;
    #food;
    #travel;
    #technology;
    #education;
    #art;
  };

  public type State = {
    #open;
    #closed;
    #canceled;
  };

  public type Event = {
    details : EventDetails;
    participants : [Principal];
    favorites : [Principal];
    creator : Principal;
    state : State;
  };

  public type EventDetails = {
    title : Text;
    //image : Blob;
    location : Text;
    description : Text;
    category : Category;
    date : Time.Time;
  };

};
