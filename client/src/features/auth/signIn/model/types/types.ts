export type LoginRequestType = {
	email: string
	password: string
}

export type LoginResponseType = {
	"accessToken": string,
	"user": {
		"id": string,
		"userName": string,
		"email": string,
		"createdAt": string
	}
}