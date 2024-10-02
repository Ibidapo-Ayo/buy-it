import { createAdminClient } from "./config";

const { DATABASE_ID, PRODUCT_ID } = process.env

export const getProducts = async()=>{
    try {

    const {databases} = await createAdminClient()
        const products = await databases.listDocuments(
            DATABASE_ID!,
            PRODUCT_ID!
        )
        return products.documents
    } catch (error) {
        console.log(error);
        
    }
}

// export const createProducts = async(formData)=> {
//     try {
            
//     } catch (error) {
//         console.log(error);
        
//     }
// }