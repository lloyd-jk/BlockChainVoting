import { logging, PersistentMap } from "near-sdk-as";

const CandidateURL = new PersistentMap<string, string>("CandidateURL");
const UserParticipation = new PersistentMap<string, string[]>(
  "UserParticipation"
);
const PollsList = new PersistentMap<string, string[]>("Prompt Array");
const VoteArray = new PersistentMap<string, i32[]>("Voting Array");
const CandidateList = new PersistentMap<string, string[]>("Candidate Pair");

//View Methods

// get the url for the candidate
export function getURL(name: string): string {
  if (CandidateURL.contains(name)) {
    return CandidateURL.getSome(name);
  } else {
    logging.log("Cant find the user");
    return "";
  }
}

// returns bool for whether the user voted
export function didParticipate(prompt: string, user: string): bool {
  if (UserParticipation.contains(prompt)) {
    let getArray = UserParticipation.getSome(prompt);
    return getArray.includes(user);
  } else {
    logging.log("No prompts found");
    return false;
  }
}

export function getAllPrompts(): string[] {
  if (PollsList.contains("AllArrays")) {
    return PollsList.getSome("AllArrays");
  } else {
    logging.log("No prompts found");
    return [];
  }
}

//returns the number of votes for each candidates
export function getVotes(prompt: string): i32[] {
  if (VoteArray.contains(prompt)) {
    return VoteArray.getSome(prompt);
  } else {
    logging.log("No prompts found");
    return [0, 0]; //If there are only two candidates
  }
}

export function getCandidateList(prompt: string): string[] {
  if (CandidateList.contains(prompt)) {
    return CandidateList.getSome(prompt);
  } else {
    logging.log("No prompts found");
    return [];
  }
}

//Change Methods

export function addURL(name: string, url: string): void {
  CandidateURL.set(name, url);
  logging.log("added url for: " + name);
}

export function addCandidateList(
  prompt: string,
  name1: string,
  name2: string
): void {
  CandidateList.set(prompt, [name1, name2]);
}

export function addToPollsList(prompt: string): void {
  logging.log("added to prompt array");
  if (PollsList.contains("AllArrays")) {
    logging.log("add addition to prompt array");
    let tempArray = PollsList.getSome("AllArrays");
    tempArray.push(prompt);
    PollsList.set("AllArrays", tempArray);
  } else {
    PollsList.set("AllArrays", [prompt]);
  }
}

export function clearPollsList(): void {
  logging.log("clearing prompt array");
  PollsList.delete("AllArrays");
}

export function addVote(prompt: string, index: i32): void {
  if (VoteArray.contains(prompt)) {
    let tempArray = VoteArray.getSome(prompt);
    let tempVal = tempArray[index];
    let newVal = tempVal + 1;
    tempArray[index] = newVal;
    VoteArray.set(prompt, tempArray);
  } else {
    let newArray = [0, 0];
    newArray[index] = 1;
    VoteArray.set(prompt, newArray);
  }
}

//Add the user to a list to ensure that they dont cast vote twice
export function recordUser(prompt: string, user: string): void {
  if (UserParticipation.contains(prompt)) {
    let tempArray = UserParticipation.getSome(prompt);
    tempArray.push(user);
    UserParticipation.set(prompt, tempArray);
  } else {
    UserParticipation.set(prompt, [user]);
  }
}
