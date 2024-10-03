export const encrypt = (o, salt = "22CP302|22CP303|22CP304") => {
    console.log("Encrypting Object:", o);
    o = JSON.stringify(o).split('');
    for (let i = 0, l = o.length; i < l; i++) {
        if (o[i] === '{') o[i] = '}';
        else if (o[i] === '}') o[i] = '{';
    }
    const encrypted = encodeURI(salt + o.join(''));
    console.log("Encrypted Data:", encrypted);
    return encrypted;
};

export const decrypt = (o, salt = "22CP302|22CP303|22CP304") => {
    try {
        console.log("Raw Encrypted Data:", o);
        console.log("Expected Salt:", salt);

        // URI Decode the encrypted data
        o = decodeURI(o);
        console.log("Decoded Encrypted Data:", o);

        // Check if the data starts with the salt
        if (salt && o.indexOf(salt) !== 0) {
            throw new Error('Salt mismatch or data is corrupted');
        }

        // Remove the salt and reverse the character swap
        o = o.substring(salt.length).split('');
        console.log("Data without Salt:", o.join(''));

        for (let i = 0, l = o.length; i < l; i++) {
            if (o[i] === '{') o[i] = '}';
            else if (o[i] === '}') o[i] = '{';
        }

        // Join the modified string and parse it as JSON
        const decrypted = JSON.parse(o.join(''));
        console.log("Decrypted Object:", decrypted);

        return decrypted;
    } catch (error) {
        console.error("Decryption Failed:", error.message);
        //throw new Error('object cannot be decrypted');
    }
};
