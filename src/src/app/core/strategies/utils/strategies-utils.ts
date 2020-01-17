
export const StrategiesUtils = {
    pmvSize: function (nbColonnes){
        return nbColonnes  * 9;
    },

    resolveSpaces: function resolveSpaces(configMessage, formatMessage, position:string, dynamicFieldName: string) {
        if (!formatMessage || !formatMessage.nbColonnes || !configMessage.valeurs[dynamicFieldName]) return;
        configMessage.valeurs[dynamicFieldName] = configMessage.valeurs[dynamicFieldName].trim();
        let spaces = Math.abs(formatMessage.nbColonnes - configMessage.valeurs[dynamicFieldName].length);
        switch (position) {
            case 'left':
                configMessage.valeurs[dynamicFieldName] = configMessage.valeurs[dynamicFieldName] + " ".repeat(spaces);
                break;
            case 'center':
                let leftSpaces = Math.ceil(spaces / 2);
                let rightSpaces = spaces - leftSpaces;
                configMessage.valeurs[dynamicFieldName] = " ".repeat(leftSpaces) + configMessage.valeurs[dynamicFieldName];
                configMessage.valeurs[dynamicFieldName] = configMessage.valeurs[dynamicFieldName] + " ".repeat(rightSpaces);
                break;
            case 'right':
                configMessage.valeurs[dynamicFieldName] = " ".repeat(spaces) + configMessage.valeurs[dynamicFieldName];
                break;
        }
    },

    /**
     * Remplit des espaces à la fin du msg.
     * @param  {[type]} value            [description]
     * @param  {string} dynamicFieldName [description]
     * @return {[type]}                  [description]
     */

    fillSpaces(message: any, formatMessage: any, dynamicFieldName: string){
        if (!formatMessage || !formatMessage.nbColonnes || !message.valeurs[dynamicFieldName]) return;
        //message.valeurs[dynamicFieldName];

        let spaces = Math.abs(formatMessage.nbColonnes - message.valeurs[dynamicFieldName].length);
        message.valeurs[dynamicFieldName] = message.valeurs[dynamicFieldName] + " ".repeat(spaces);
        //return message.valeurs[dynamicFieldName];
    }
}
