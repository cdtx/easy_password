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
easy_password.v1 = function(public_infos) {
    this.data = public_infos || {};
}
$.extend(easy_password.v1.prototype, {
    get_password : function(key) {
        return this.generate(key).substring(0, this.data.size)
    },

    generate : function(key) {
        // Create the unique string from public infos + key
        input = this.data.name + this.data.numbers + this.data.uppers + this.data.specials + key;
        hashChar = input;

        var watchdog = Date.now();
        do {
            // Hash the infos
            hash = sjcl.hash.sha256.hash(hashChar);
            // Create a 32 bytes array from the hash result
            hashChar = [];
            for(var i=0; i<hash.length; i++) {
                hashChar = hashChar.concat(byteArray(hash[i]));
            }
            this.adjust(hashChar);
            if((Date.now() - watchdog) > 10000) { // 10seconds
                return 'undefined';
            }
        } while(this.check_criterias(hashChar) == false);
        
        // Generate a string with it
        result = String.fromCharCode.apply(null, hashChar)
        return result;
            
    },

    adjust : function(inputs) {
        for(var i=0 ; i<inputs.length ; i++) {
            // Only visible chars
            inputs[i] = (inputs[i] % (0x7E - 0x21)) + 0x21;
            // No specials
            if(!this.data.specials) {
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
            if(!this.data.numbers) {
                if((inputs[i] >= 0x30) && (inputs[i] <= 0x39)) {
                    inputs[i] = inputs[i] - 0x30 + 0x41;
                }
            }
            // No uppercase
            if(!this.data.uppers) {
                if((inputs[i] >= 0x41) && (inputs[i] <= 0x5A)) {
                    inputs[i] = inputs[i] - 0x41 + 0x61;
                }
            }
            // No lowercase
            if(!this.data.lowers) {
                if((inputs[i] >= 0x61) && (inputs[i] <= 0x7A)) {
                    inputs[i] = inputs[i] - 0x61 + 0x41;
                }
            }
        }
    },

    check_criterias : function(inputs) {
        var numbers=false, uppers=false, lowers=false, specials=false;
        for(var i=0 ; i<this.data.size ; i++) {
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
            // Lowercase
            if((inputs[i] >= 0x71) && (inputs[i] <= 0x7A)) {
                lowers = true;
            }
        }
        if( (this.data.numbers ^ numbers) || (this.data.uppers ^ uppers) || (this.data.lowers ^ lowers) || (this.data.specials ^ specials)) {
            return false;
        }
        return true;
    },
})

