import { logging, PersistentMap } from "near-sdk-as";

const CandidateDetails = new PersistentMap<string, string[]>("CandidateInfo");
const UserParticipation = new PersistentMap<string, string[]>(
  "UserParticipation"
);
const PollsList = new PersistentMap<string, string[]>("List of Posts");
const VoteArray = new PersistentMap<string, i32[]>("Voting Array");
const CandidateList = new PersistentMap<string, string[]>("Candidate List");

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

//Change Methods
export function addDetails(name: string, url: string, branch: string, motto: string): void {
  CandidateDetails.set(name, [url, branch, motto]);
  logging.log("added details for: " + name);
}

export function addCandidateList(
  post: string,
  name_array: string[]
): void {
  CandidateList.set(post, name_array);
}

export function addToPollsList(post: string): void {
  logging.log("added to post array");
  if (PollsList.contains("AllPolls")) {
    // logging.log("add addition to post array");
    let tempArray = PollsList.getSome("AllPolls");
    tempArray.push(post);
    PollsList.set("AllPolls", tempArray);
  } else {
    PollsList.set("AllPolls", [post]);
  }
}

export function clearPollsList(): void {
  logging.log("clearing post array");
  PollsList.delete("AllPolls");
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
