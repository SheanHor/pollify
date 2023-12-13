export type UserType = {
    email: string,
    username: string,
    polls: string[]
} 

export type PollType = {
    question: string,
    ownerId : string,
    editable : boolean,
    expiredTime : Date,
    options?: {
        name: string,
        counts: string[]
    }[]
}