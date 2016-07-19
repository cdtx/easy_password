/* Generic material to manage class inheritance */

/* Function to be used after a class's constructor declaration */
/* to declare inheritance */
var inheritsFrom = function(child, parent) {
    child.prototype = Object.create(parent.prototype);
}

// namespace
var easy_password = {};

var byteArray = function(integer) {
    result = [0, 0, 0, 0];
    result[3] = integer & 0xFF;
    result[2] = (integer >> 8) & 0xFF;
    result[1] = (integer >> 16) & 0xFF;
    result[0] = (integer >> 32) & 0xFF;
    return result; 
}

easy_password.getPasswords = function() {
    return $.ajax({
        url: 'api/password-list/',
        type: 'GET',
        contentType : 'application/json',
    })
}

easy_password.getPassword = function(id) {
    return $.ajax({
        url: 'api/password/' + id + '/',
        type: 'GET',
        contentType : 'application/json',
    })
}

easy_password.createPassword = function(params) {
    return $.ajax({
        url: 'api/password-list/',
        data: JSON.stringify(params),
        type: 'POST',
        contentType : 'application/json',
    })
}

// Class V1
easy_password.v1 = function() {

}
$.extend(easy_password.v1.prototype, {
    get_password : function(public_infos, key) {
        return this.generate(public_infos, key).substring(0, public_infos.size)
    },

    generate : function(public_infos, key) {
        // Create the unique string from public infos + key
        input = public_infos.name + public_infos.numbers + public_infos.uppers + public_infos.specials + key;
        hashChar = input;

        do {
            // Hash the infos
            hash = sjcl.hash.sha256.hash(hashChar);
            // Create a 32 bytes array from the hash result
            hashChar = [];
            for(var i=0; i<hash.length; i++) {
                hashChar = hashChar.concat(byteArray(hash[i]));
            }
            this.adjust(hashChar, public_infos);

        } while(this.check_criterias(hashChar, public_infos) == false);
        
        // Generate a string with it
        result = String.fromCharCode.apply(null, hashChar)
        return result;
            
    },

    adjust : function(inputs, public_infos) {
        for(var i=0 ; i<inputs.length ; i++) {
            // Only visible chars
            inputs[i] = (inputs[i] % (0x7E - 0x21)) + 0x21;
            // No specials
            if(!public_infos.specials) {
                if( (inputs[i] >= 0x21) && (inputs[i] <= 0x2F) ) {
                    inputs[i] = inputs[i] - 0x21 + 0x41;
                }
                else if ( (inputs[i] >= 0x3A) && (inputs[i] <= 0x40) ) {
                    inputs[i] = inputs[i] - 0x3A + 0x30;
                }
                else if ( (inputs[i] >= 0x5B) && (inputs[i] <= 0x60) ) {
                    inputs[i] = inputs[i] - 0x5B + 0x61;
                }
                else if ( (inputs[i] >= 0x7B) && (inputs[i] <= 0x7E) ) {
                    inputs[i] = inputs[i] - 0x7B + 0x67;
                }
            }
            // No numbers
            if(!public_infos.numbers) {
                if((inputs[i] >= 0x30) && (inputs[i] <= 0x39)) {
                    inputs[i] = inputs[i] - 0x30 + 0x41;
                }
            }
            // No uppercase
            if(!public_infos.uppers) {
                if((inputs[i] >= 0x41) && (inputs[i] <= 0x5A)) {
                    inputs[i] = inputs[i] - 0x41 + 0x61;
                }
            }
        }
    },

    check_criterias : function(inputs, public_infos) {
        var numbers=false, uppers=false, specials=false;
        for(var i=0 ; i<inputs.length ; i++) {
            // Specials
            if( (inputs[i] >= 0x21) && (inputs[i] <= 0x2F) ) {
                specials = true;
            }
            else if ( (inputs[i] >= 0x3A) && (inputs[i] <= 0x40) ) {
                specials = true;
            }
            else if ( (inputs[i] >= 0x5B) && (inputs[i] <= 0x60) ) {
                specials = true;
            }
            else if ( (inputs[i] >= 0x7B) && (inputs[i] <= 0x7E) ) {
                specials = true;
            }
            // Numbers
            if((inputs[i] >= 0x30) && (inputs[i] <= 0x39)) {
                numbers = true;
            }
            // Uppercase
            if((inputs[i] >= 0x41) && (inputs[i] <= 0x5A)) {
                uppers = true;
            }
        }
        if( (public_infos.numbers ^ numbers) || (public_infos.uppers ^ uppers) || (public_infos.specials ^ specials) ) {
            return false;
        }
        return true;
    },
})

