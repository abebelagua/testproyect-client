const faker = require("faker");

const randomNumber = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min);

const generateUsername = () => {
	let username = faker.name.firstName().toLowerCase().charAt(0);

	username +=
		randomNumber(0, 1) === 1
			? faker.name.firstName().toLowerCase().charAt(0)
			: "";

	if (randomNumber(0, 1) === 1) {
		username +=
			randomNumber(0, 1) === 1
				? faker.name.lastName().toLowerCase().charAt(0)
				: "";
		username += faker.name.lastName().toLowerCase();
	} else {
		username += faker.name.lastName().toLowerCase();
		username +=
			randomNumber(0, 1) === 1
				? faker.name.lastName().toLowerCase().charAt(0)
				: "";
	}

	return username.replace("'", "");
};

const generateUsernames = (amount = 1) => {
	const usernames = [];

	for (let i = 0; i < amount; i++) {
		usernames.push(generateUsername());
	}

	return usernames;
};

const generateEmail = () => faker.internet.email().toLowerCase();

const generateFullname = () => {
	let username = faker.name.firstName();

	username += randomNumber(0, 1) === 1 ? ` ${faker.name.firstName()}` : "";
	username += ` ${faker.name.lastName()}`;
	username += ` ${faker.name.lastName()}`;

	return username.replace("'", "");
};

export {
	randomNumber,
	generateUsername,
	generateUsernames,
	generateEmail,
	generateFullname,
};

/*
    address
        zipCode
        zipCodeByState
        city
        cityPrefix
        citySuffix
        streetName
        streetAddress
        streetSuffix
        streetPrefix
        secondaryAddress
        county
        country
        countryCode
        state
        stateAbbr
        latitude
        longitude
        direction
        cardinalDirection
        ordinalDirection
        nearbyGPSCoordinate
        timeZone
    commerce
        color
        department
        productName
        price
        productAdjective
        productMaterial
        product
        productDescription
    company
        suffixes
        companyName
        companySuffix
        catchPhrase
        bs
        catchPhraseAdjective
        catchPhraseDescriptor
        catchPhraseNoun
        bsAdjective
        bsBuzz
        bsNoun
    database
        column
        type
        collation
        engine
    date
        past
        future
        between
        recent
        soon
        month
        weekday
    fake
    finance
        account
        accountName
        routingNumber
        mask
        amount
        transactionType
        currencyCode
        currencyName
        currencySymbol
        bitcoinAddress
        litecoinAddress
        creditCardNumber
        creditCardCVV
        ethereumAddress
        iban
        bic
        transactionDescription
    git
        branch
        commitEntry
        commitMessage
        commitSha
        shortSha
    hacker
        abbreviation
        adjective
        noun
        verb
        ingverb
        phrase
    helpers
        randomize
        slugify
        replaceSymbolWithNumber
        replaceSymbols
        replaceCreditCardSymbols
        repeatString
        regexpStyleStringParse
        shuffle
        mustache
        createCard
        contextualCard
        userCard
        createTransaction
    image
        image
        avatar
        imageUrl
        abstract
        animals
        business
        cats
        city
        food
        nightlife
        fashion
        people
        nature
        sports
        technics
        transport
        dataUri
        lorempixel
        unsplash
        lorempicsum
    internet
        avatar
        email
        exampleEmail
        userName
        protocol
        url
        domainName
        domainSuffix
        domainWord
        ip
        ipv6
        userAgent
        color
        mac
        password
    lorem
        word
        words
        sentence
        slug
        sentences
        paragraph
        paragraphs
        text
        lines
    music
        genre
    name
        firstName
        lastName
        middleName
        findName
        jobTitle
        gender
        prefix
        suffix
        title
        jobDescriptor
        jobArea
        jobType
    phone
        phoneNumber
        phoneNumberFormat
        phoneFormats
    random
        number
        float
        arrayElement
        arrayElements
        objectElement
        uuid
        boolean
        word
        words
        image
        locale
        alpha
        alphaNumeric
        hexaDecimal
    system
        fileName
        commonFileName
        mimeType
        commonFileType
        commonFileExt
        fileType
        fileExt
        directoryPath
        filePath
        semver
    time
        recent
    unique
    vehicle
        vehicle
        manufacturer
        model
        type
        fuel
        vin
        color
*/
