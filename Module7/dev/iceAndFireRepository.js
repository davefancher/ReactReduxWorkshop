import axios from "axios";

const API_URL = "https://www.anapioficeandfire.com/api/";
const API_VERSION_HEADER = "application/vnd.anapioficeandfire+json; version=1";

const API_REQUEST_HEADER = {
    "headers": {
        "accept": API_VERSION_HEADER
    }
};

const API_CATEGORY = {
    CHARACTERS: "characters"
};

const get =
    url => axios.get(url, API_REQUEST_HEADER);

const getPage =
    (category, munge) =>
        (page, pageSize) =>
            get(`${API_URL}/${category}?page=${page}&pageSize=${pageSize}`)
                .then(response => response.data.map(munge));

const mungeCharacter =
    character => ({
        name : character.name || (character.aliases[0] + "*")
    });

export const getCharacters = getPage(API_CATEGORY.CHARACTERS, mungeCharacter);
