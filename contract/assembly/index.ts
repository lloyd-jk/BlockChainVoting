import { logging, PersistentMap } from "near-sdk-as";

const CandidateDetails = new PersistentMap<string, string[]>("CandidateInfo");
const UserParticipation = new PersistentMap<string, string[]>(
  "UserParticipation"
);
const PollsList = new PersistentMap<string, string[]>("List of Posts");
const VoteArray = new PersistentMap<string, i32[]>("Voting Array");
const CandidateList = new PersistentMap<string, string[]>("Candidate List");
const ActiveList = new PersistentMap<string, string[]>("If polls are active");
//View Methods

// get the url for the candidate
export function getDetails(name: string): string[] {
  if (CandidateDetails.contains(name)) {
    return CandidateDetails.getSome(name);
  } else {
    // logging.log("Cant find the user");
    return [];
  }
}

// returns bool for whether the user voted
export function didParticipate(post: string, user: string): bool {
  if (UserParticipation.contains(post)) {
    let getArray = UserParticipation.getSome(post);
    return getArray.includes(user);
  } else {
    // logging.log("No posts found");
    return false;
  }
}

export function getAllPosts(): string[] {
  if (PollsList.contains("AllPolls")) {
    return PollsList.getSome("AllPolls");
  } else {
    // logging.log("No posts found");
    return [];
  }
}

//returns the number of votes for each candidates
export function getVotes(post: string): i32[] {
  if (VoteArray.contains(post)) {
    return VoteArray.getSome(post);
  } else {
    // logging.log("No posts found");
    let i32Array: i32[] = [];
    for (let i = 0; i < CandidateList.getSome(post).length; i++) {
      i32Array[i] = 0;
    }
    return i32Array;
  }
}

export function getCandidateList(post: string): string[] {
  if (CandidateList.contains(post)) {
    return CandidateList.getSome(post);
  } else {
    // logging.log("No posts found");
    return [];
  }
}

export function getActivePolls(): string[] {
  let ret: string[] = [];
  if (ActiveList.contains("ActivePolls")) {
    // logging.log("add addition to post array");
    return ActiveList.getSome("ActivePolls");
  }
  return ret;
}

export function isPollActive(post: string): bool {
  if (ActiveList.contains("ActivePolls")) {
    let arr = ActiveList.getSome("ActivePolls");
    if (arr.indexOf(post) >= 0) {
      return true;
    }
  }
  return false;
}

//Change Methods
export function addDetails(
  name: string,
  url: string,
  branch: string,
  motto: string
): void {
  CandidateDetails.set(name, [url, branch, motto]);
  logging.log("added details for: " + name);
}

export function addCandidateList(post: string, name_array: string[]): void {
  CandidateList.set(post, name_array);
}

export function addToPollsList(post: string): void {
  logging.log("added to post array");
  if (PollsList.contains("AllPolls")) {
    // logging.log("add addition to post array");
    const arr = PollsList.getSome("AllPolls");
    if (arr.indexOf(post) < 0) {
      let tempArray = PollsList.getSome("AllPolls");
      tempArray.push(post);
      PollsList.set("AllPolls", tempArray);
    }
  } else {
    PollsList.set("AllPolls", [post]);
  }
}

export function activatePoll(post: string): void {
  logging.log("added to active post array");
  if (ActiveList.contains("ActivePolls")) {
    // logging.log("add addition to post array");
    const arr = ActiveList.getSome("ActivePolls");
    if (arr.indexOf(post) < 0) {
      let tempArray = ActiveList.getSome("ActivePolls");
      tempArray.push(post);
      ActiveList.set("ActivePolls", tempArray);
    }
  } else {
    ActiveList.set("ActivePolls", [post]);
  }
}

export function deactivatePoll(post: string): void {
  logging.log("deactivating poll");
  if (ActiveList.contains("ActivePolls")) {
    // logging.log("add addition to post array");
    const arr = ActiveList.getSome("ActivePolls");
    const i = arr.indexOf(post);
    if (i >= 0) {
      let tempArray = ActiveList.getSome("ActivePolls");
      tempArray.splice(i, 1);
      ActiveList.set("ActivePolls", tempArray);
    }
  }
}

export function clearPollsList(): void {
  if (PollsList.contains("AllPolls")) {
    const arr = PollsList.getSome("AllPolls");

    arr.forEach((post) => {
      if (CandidateList.contains(post)) {
        const arr_1 = CandidateList.getSome(post);
        logging.log(arr_1.toString());
        arr_1.forEach((name) => {
          CandidateDetails.delete(name);
        });
      }
      VoteArray.delete(post);
      UserParticipation.delete(post);
      CandidateList.delete(post);
      deactivatePoll(post);
    });

    PollsList.delete("AllPolls");
  }
}

export function deletePoll(post: string): string[] {
  // function arrayRemove(arr: string[], value: string) {
  //   return arr.filter(function (ele) {
  //     return ele != value;
  //   });
  // }
  if (PollsList.contains("AllPolls")) {
    var arr = PollsList.getSome("AllPolls");
    // arr = arr.filter(function (ele) {
    //   return ele != post;
    // });
    var index = arr.indexOf(post);
    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      return arr;
    }
    VoteArray.delete(post);
    UserParticipation.delete(post);
    CandidateList.delete(post);
    return arr;
  }
  return [];
}

export function addVote(post: string, index: i32): void {
  if (VoteArray.contains(post)) {
    let tempArray = VoteArray.getSome(post);
    let tempVal = tempArray[index];
    let newVal = tempVal + 1;
    tempArray[index] = newVal;
    VoteArray.set(post, tempArray);
  } else {
    let newArray: i32[] = [];
    for (let i = 0; i < CandidateList.getSome(post).length; i++) {
      newArray[i] = 0;
    }
    newArray[index] = 1;
    logging.log(newArray);
    VoteArray.set(post, newArray);
  }
}

//Add the user to a list to ensure that they dont cast vote twice
export function recordUser(post: string, user: string): void {
  if (UserParticipation.contains(post)) {
    let tempArray = UserParticipation.getSome(post);
    tempArray.push(user);
    UserParticipation.set(post, tempArray);
  } else {
    UserParticipation.set(post, [user]);
  }
}
