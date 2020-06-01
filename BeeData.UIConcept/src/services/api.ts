import axios from "axios";
import config from "misc/config";

export default class ApiService {

    public static async get<T>(entityName: string): Promise<T> {

        let apiUrl = ApiService.getUrl(entityName);

        return axios.get(apiUrl)
            .then((result) => {

                return result.data;

            }).catch((error) => {
                throw error;
            });
    }

    public static async save<T>(entityName: string, entity: any): Promise<T> {

        let apiUrl = ApiService.getUrl(entityName);

        return axios.post(apiUrl, entity)
            .then((result) => {

                //result.error != 200?
                //TODO: check for errors
                return result.data;

            }).catch((error) => {
                throw error;
            });
    }

    public static getUrl(uri: string) {
        return config.API_URL + uri;
    }
}
