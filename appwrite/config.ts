import { Account, Client, Databases, Storage } from 'node-appwrite';

const client = new Client()

const createAdminClient = async () => {
    client.setEndpoint(process.env.NEXT_BASE_URL!).setProject(process.env.PROJECT_ID!).setKey(process.env.NEXT_API_KEY!);

    return {
        get account() {
            return new Account(client)
        },

        get databases() {
            return new Databases(client)
        },
        get storage(){
            return new Storage(client)
        }
    }
}

const createSessionClient = async (session:any) => {
    client.setEndpoint(process.env.NEXT_BASE_URL!).setProject(process.env.PROJECT_ID!)
    
    if (session) {
        client.setSession(session)
    }

    return {
        get account() {
            return new Account(client)
        },

        get databases() {
            return new Databases(client)
        }
    }
}

export { createSessionClient, createAdminClient }