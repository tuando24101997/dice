import axiosClient from "./axiosClient";

const IndexAPI = {
    getNumberRandom(params){
        const url = `roll-dice-result/${params}`;
        return axiosClient.get(url)
    },

    getIdRandom(params){
        const url = 'roll-dice';
        return axiosClient.get(url, {params})
    },

    getBlock(params){
        const url = 'roll-dice-history';
        return axiosClient.get(url, {params})
    }
}

export default IndexAPI;