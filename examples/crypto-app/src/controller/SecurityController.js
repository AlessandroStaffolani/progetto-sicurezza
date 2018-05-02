import {str2ab, ab2str} from "../lib/utiliy";

export function encryptNoKey(guiComponent, value) {

    if (guiComponent.state.text.value === '') {
        guiComponent.setState({
            text: {
                value: guiComponent.state.text.value,
                className: 'form-control is-invalid'
            }
        });
        return;
    }

    let generetaKeyPromise = window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256, //can be  128, 192, or 256
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    );

    let encryptPromise = generetaKeyPromise.then((key) => window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",

            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encryptNoKey!
            //Recommended to use 12 bytes length
            iv: guiComponent.iv,

            //Additional authentication data (optional)
            additionalData: guiComponent.additionalData,

            //Tag length (optional)
            tagLength: guiComponent.tagLen, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
        },
        key, //from generateKey or importKey above
        str2ab(value) //ArrayBuffer of data you want to encryptNoKey
    ));

    encryptPromise.then((encrypted) => {
        guiComponent.setState({
            result: {
                value: ab2str(encrypted),
                className: 'form-control'
            },
            decryptIsDisabled: false,
        });
        guiComponent.keyPromise = generetaKeyPromise;
    });

    Promise.all([generetaKeyPromise, encryptPromise]).then(([key, encrypted]) => exportKey(guiComponent, key));

}

export function encrypt(guiComponent, keySumbitted, value) {

    let isValid = true;

    if (guiComponent.state.text.value === '') {
        guiComponent.setState({
            text: {
                value: guiComponent.state.text.value,
                className: 'form-control is-invalid'
            }
        });
        isValid = false;
    }
    if (guiComponent.state.pass.value === '') {
        guiComponent.setState({
            pass: {
                value: guiComponent.state.pass.value,
                className: 'form-control is-invalid'
            }
        });
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    let hasKeyPromise = window.crypto.subtle.digest(
        {
            name: "SHA-256",
        },
        str2ab(keySumbitted) //The data you want to hash as an ArrayBuffer
    );

    let importKeyPromise = hasKeyPromise.then((hash) => window.crypto.subtle.importKey(
        "raw", //can be "jwk" or "raw"
        hash,
        {   //guiComponent is the algorithm options
            name: "AES-GCM",
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    ));

    let encryptPromise = importKeyPromise.then((key) => window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",

            //Don't re-use initialization vectors!
            //Always generate a new iv every time your encryptNoKey!
            //Recommended to use 12 bytes length
            iv: guiComponent.iv,

            //Additional authentication data (optional)
            additionalData: guiComponent.additionalData,

            //Tag length (optional)
            tagLength: guiComponent.tagLen, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
        },
        key, //from generateKey or importKey above
        str2ab(value) //ArrayBuffer of data you want to encryptNoKey
    ));

    encryptPromise.then((encrypted) => {
        guiComponent.setState({
            result: {
                value: ab2str(encrypted),
                className: 'form-control'
            },
            decryptIsDisabled: false,
        });
        guiComponent.keyPromise = importKeyPromise;
    });

    Promise.all([hasKeyPromise, importKeyPromise, encryptPromise]).then(([hash, key, encrypted]) => exportKey(guiComponent, key));

}

export function decrypt(guiComponent, encrypted) {

    let decryptPromise = guiComponent.keyPromise.then((key) => window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: guiComponent.iv, //The initialization vector you used to encryptNoKey
            additionalData: guiComponent.additionalData, //The addtionalData you used to encryptNoKey (if any)
            tagLength: guiComponent.tagLen, //The tagLength you used to encryptNoKey (if any)
        },
        key, //from generateKey or importKey above
        str2ab(encrypted) //ArrayBuffer of the data
    ));

    decryptPromise.then((decrypted) => {
        guiComponent.setState({
            result: {
                value: ab2str(decrypted),
                className: 'form-control'
            },
            decryptIsDisabled: true,
        })
    });

    decryptPromise.catch(function(err){
        console.error(err);
    });
}

function exportKey(guiComponent, key) {

    let exportKeyPromise = window.crypto.subtle.exportKey(
        "raw", //can be "jwk" or "raw"
        key //extractable must be true
    );

    exportKeyPromise.then((keyData) => {
        guiComponent.setState({
            key: {
                value: ab2str(keyData),
                className: 'form-control',
                type: 'password',
            },
        });
    });

    exportKeyPromise.catch(function(err){
        console.error(err);
    });
}