import{ Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const HISTORY_ID = import.meta.env.VITE_APPWRITE_HISTORY_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSavedCount = async (movieTitle, movieID, backdropPath) => {
    // console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);

    // 1. Use appwrite SDK to check if search term exists in database
    try {
        
        const result = await database.listDocuments(DATABASE_ID, HISTORY_ID,[
            Query.equal('movieName', movieTitle),
        ])

        // 2. If it does, update the count
        if(result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, HISTORY_ID, doc.$id, {
                count: doc.count + 1,
            })
        // 3. if it doesn't, create a new document with the search term and count as 1
        } else{
            await database.createDocument(DATABASE_ID, HISTORY_ID, ID.unique(), {
                searchTerm: movieTitle,
                count: 1,
                movie_id: movieID,
                poster_url: `https://image.tmdb.org/t/p/w500/${backdropPath}`,
            })

        }

    } catch (error) {
        console.error(error);
    }
}

export const getSavedMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, HISTORY_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])

        return result.documents;

    } catch (error) {
        console.error(error);
    }
}