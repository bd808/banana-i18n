'use strict'

import Banana from '../src/'
import assert from 'assert'
import fs from 'fs'

const grammarTests = {
  bs: [{
    word: 'word',
    grammarForm: 'instrumental',
    expected: 's word',
    description: 'Grammar test for instrumental case'
  }, {
    word: 'word',
    grammarForm: 'lokativ',
    expected: 'o word',
    description: 'Grammar test for lokativ case'
  }],

  dsb: [{
    word: 'word',
    grammarForm: 'instrumental',
    expected: 'z word',
    description: 'Grammar test for instrumental case'
  }, {
    word: 'word',
    grammarForm: 'lokatiw',
    expected: 'wo word',
    description: 'Grammar test for lokatiw case'
  }],

  fi: [{
    word: 'talo',
    grammarForm: 'genitive',
    expected: 'talon',
    description: 'Grammar test for genitive case'
  }, {
    word: 'linux',
    grammarForm: 'genitive',
    expected: 'linuxin',
    description: 'Grammar test for genitive case'
  }, {
    word: 'talo',
    grammarForm: 'elative',
    expected: 'talosta',
    description: 'Grammar test for elative case'
  }, {
    word: 'pastöroitu',
    grammarForm: 'partitive',
    expected: 'pastöroitua',
    description: 'Grammar test for partitive case'
  }, {
    word: 'talo',
    grammarForm: 'partitive',
    expected: 'taloa',
    description: 'Grammar test for partitive case'
  }, {
    word: 'talo',
    grammarForm: 'illative',
    expected: 'taloon',
    description: 'Grammar test for illative case'
  }, {
    word: 'linux',
    grammarForm: 'inessive',
    expected: 'linuxissa',
    description: 'Grammar test for inessive case'
  }],

  ga: [{
    word: 'an Domhnach',
    grammarForm: 'ainmlae',
    expected: 'Dé Domhnaigh',
    description: 'Grammar test for ainmlae case'
  }, {
    word: 'an Luan',
    grammarForm: 'ainmlae',
    expected: 'Dé Luain',
    description: 'Grammar test for ainmlae case'
  }, {
    word: 'an Satharn',
    grammarForm: 'ainmlae',
    expected: 'Dé Sathairn',
    description: 'Grammar test for ainmlae case'
  }],

  he: [{
    word: 'ויקיפדיה',
    grammarForm: 'prefixed',
    expected: 'וויקיפדיה',
    description: 'Duplicate the "Waw" if prefixed'
  }, {
    word: 'וולפגנג',
    grammarForm: 'prefixed',
    expected: 'וולפגנג',
    description: 'Duplicate the "Waw" if prefixed, but not if it is already duplicated.'
  }, {
    word: 'הקובץ',
    grammarForm: 'prefixed',
    expected: 'קובץ',
    description: 'Remove the "He" if prefixed'
  }, {
    word: 'Wikipedia',
    grammarForm: 'תחילית',
    expected: '־Wikipedia',
    description: 'Add a hyphen (maqaf) before non-Hebrew letters'
  }, {
    word: '1995',
    grammarForm: 'תחילית',
    expected: '־1995',
    description: 'Add a hyphen (maqaf) before numbers'
  }],

  hsb: [{
    word: 'word',
    grammarForm: 'instrumental',
    expected: 'z word',
    description: 'Grammar test for instrumental case'
  }, {
    word: 'word',
    grammarForm: 'lokatiw',
    expected: 'wo word',
    description: 'Grammar test for lokatiw case'
  }],

  hu: [{
    word: 'Wikipédiá',
    grammarForm: 'rol',
    expected: 'Wikipédiáról',
    description: 'Grammar test for rol case'
  }, {
    word: 'Wikipédiá',
    grammarForm: 'ba',
    expected: 'Wikipédiába',
    description: 'Grammar test for ba case'
  }, {
    word: 'Wikipédiá',
    grammarForm: 'k',
    expected: 'Wikipédiák',
    description: 'Grammar test for k case'
  }],

  hy: [{
    word: 'Մաունա',
    grammarForm: 'genitive',
    expected: 'Մաունայի',
    description: 'Grammar test for genitive case'
  }, {
    word: 'հետո',
    grammarForm: 'genitive',
    expected: 'հետոյի',
    description: 'Grammar test for genitive case'
  }, {
    word: 'գիրք',
    grammarForm: 'genitive',
    expected: 'գրքի',
    description: 'Grammar test for genitive case'
  }, {
    word: 'ժամանակի',
    grammarForm: 'genitive',
    expected: 'ժամանակիի',
    description: 'Grammar test for genitive case'
  }],

  la: [{
    word: 'Translatio',
    grammarForm: 'genitive',
    expected: 'Translationis',
    description: 'Grammar test for genitive case'
  }, {
    word: 'Translatio',
    grammarForm: 'accusative',
    expected: 'Translationem',
    description: 'Grammar test for accusative case'
  }, {
    word: 'Translatio',
    grammarForm: 'ablative',
    expected: 'Translatione',
    description: 'Grammar test for ablative case'
  }],

  os: [{
    word: 'бæстæ',
    grammarForm: 'genitive',
    expected: 'бæсты',
    description: 'Grammar test for genitive case'
  }, {
    word: 'бæстæ',
    grammarForm: 'allative',
    expected: 'бæстæм',
    description: 'Grammar test for allative case'
  }, {
    word: 'Тигр',
    grammarForm: 'dative',
    expected: 'Тигрæн',
    description: 'Grammar test for dative case'
  }, {
    word: 'цъити',
    grammarForm: 'dative',
    expected: 'цъитийæн',
    description: 'Grammar test for dative case'
  }, {
    word: 'лæппу',
    grammarForm: 'genitive',
    expected: 'лæппуйы',
    description: 'Grammar test for genitive case'
  }, {
    word: '2011',
    grammarForm: 'equative',
    expected: '2011-ау',
    description: 'Grammar test for equative case'
  }],

  ru: [{
    word: 'транслэйтвики',
    grammarForm: 'genitive',
    expected: 'транслэйтвики',
    description: 'Grammar test for genitive case'
  }, {
    word: 'тесть',
    grammarForm: 'genitive',
    expected: 'тестя',
    description: 'Grammar test for genitive case'
  }, {
    word: 'привилегия',
    grammarForm: 'genitive',
    expected: 'привилегии',
    description: 'Grammar test for genitive case'
  }, {
    word: 'установка',
    grammarForm: 'genitive',
    expected: 'установки',
    description: 'Grammar test for genitive case'
  }, {
    word: 'похоти',
    grammarForm: 'genitive',
    expected: 'похотей',
    description: 'Grammar test for genitive case'
  }, {
    word: 'доводы',
    grammarForm: 'genitive',
    expected: 'доводов',
    description: 'Grammar test for genitive case'
  }, {
    word: 'песчаник',
    grammarForm: 'genitive',
    expected: 'песчаника',
    description: 'Grammar test for genitive case'
  }],

  sl: [{
    word: 'word',
    grammarForm: 'orodnik',
    expected: 'z word',
    description: 'Grammar test for orodnik case'
  }, {
    word: 'word',
    grammarForm: 'mestnik',
    expected: 'o word',
    description: 'Grammar test for mestnik case'
  }],

  uk: [{
    word: 'транслейтвікі',
    grammarForm: 'genitive',
    expected: 'транслейтвікі',
    description: 'Grammar test for genitive case'
  }, {
    word: 'тесть',
    grammarForm: 'genitive',
    expected: 'тестя',
    description: 'Grammar test for genitive case'
  }, {
    word: 'Вікіпедія',
    grammarForm: 'genitive',
    expected: 'Вікіпедії',
    description: 'Grammar test for genitive case'
  }, {
    word: 'установка',
    grammarForm: 'genitive',
    expected: 'установки',
    description: 'Grammar test for genitive case'
  }, {
    word: 'похоти',
    grammarForm: 'genitive',
    expected: 'похотей',
    description: 'Grammar test for genitive case'
  }, {
    word: 'доводы',
    grammarForm: 'genitive',
    expected: 'доводов',
    description: 'Grammar test for genitive case'
  }, {
    word: 'песчаник',
    grammarForm: 'genitive',
    expected: 'песчаника',
    description: 'Grammar test for genitive case'
  }, {
    word: 'Вікіпедія',
    grammarForm: 'accusative',
    expected: 'Вікіпедію',
    description: 'Grammar test for accusative case'
  }]
}

describe('Banana', function () {
  it('should parse and localize to English', () => {
    let locale = 'en'
    const banana = new Banana(locale, {})
    const messages = fs.readFileSync(`${__dirname}/i18n/${locale}.json`)
    banana.load(JSON.parse(messages), locale)
    assert.strictEqual(banana.i18n('msg-one'), 'One')
    assert.strictEqual(banana.i18n('msg-two', 10), '10 results')
    assert.strictEqual(banana.i18n('msg-three', 10), '10 results')
    assert.strictEqual(banana.i18n('msg-three', 1), 'One result')
    assert.strictEqual(banana.i18n('msg-four', 10, 4), 'There are 10 results in 4 files')
  })

  it('should load the messages for multiple locales', () => {
    const banana = new Banana()
    const messages = {
      en: {
        message_1: 'Message one',
        message_2: 'Message two'
      },
      ml: {
        message_1: 'ഒന്നാമത്തെ മെസ്സേജ്'
      },
      es: {
        message_1: 'Message one'
      }
    }
    banana.load(messages)
    assert.ok(banana.messageStore.hasLocale('en'))
    assert.ok(banana.messageStore.hasLocale('ml'))
    banana.setLocale('en')
    assert.strictEqual(banana.i18n('message_1'), 'Message one')
    banana.setLocale('ml')
    assert.strictEqual(banana.i18n('message_1'), 'ഒന്നാമത്തെ മെസ്സേജ്')
    banana.setLocale('es')
    assert.strictEqual(banana.i18n('message_2'), 'Message two', 'Fallbacks to en message')
    banana.setLocale('uk')
    assert.strictEqual(banana.i18n('message_2'), 'Message two', 'Fallbacks to en message by first checking ru.')
  })

  it('should respect finalFallback option', () => {
    const banana = new Banana('es', {
      messages: {
        ml: {
          message_1: 'ഒന്നാമത്തെ മെസ്സേജ്',
          message_2: 'രണ്ടാമത്തെ മെസ്സേജ്'
        },
        en: {
          message_1: 'Message one',
          message_2: 'Message two'
        }
      },
      finalFallback: 'ml'
    })
    assert.ok(!banana.messageStore.hasLocale('es'))
    assert.ok(banana.messageStore.hasLocale('en'))
    assert.ok(banana.messageStore.hasLocale('ml'))
    assert.strictEqual(banana.i18n('message_2'), 'രണ്ടാമത്തെ മെസ്സേജ്')
  })

  it('should respect locales with country codes', () => {
    const banana = new Banana('en-GB', {
      messages: {
        'en': {
          message_1: 'Message one',
          message_2: 'Message two'
        }
      }
    })
    assert.strictEqual(banana.i18n('message_2'), 'Message two')
  })

  it('should throw errors on invalid locales', () => {
    assert.throws(() => {
      // eslint-disable-next-line no-new
      new Banana('es/en', {
        messages: {
          message_1: 'Message one',
          message_2: 'Message two'
        }
      })
    }, Error, 'Invalid locale es/en')
  })

  it('should throw errors on invalid message source', () => {
    assert.throws(() => {
      // eslint-disable-next-line no-new
      new Banana('es/en', {
        messages: []
      })
    }, Error, 'Invalid message source.')
  })

  it('should throw errors on invalid message key', () => {
    assert.throws(() => {
      // eslint-disable-next-line no-new
      new Banana('es/en', {
        messages: {
          message_1: ['Message one'],
          message_2: 'Message two'
        }
      })
    }, Error, 'Invalid message key.')
  })

  it('should merge messages when added to an existing locale', () => {
    const banana = new Banana('ca', {
      messages: {
        'ca': {
          message_1: 'Message one',
          message_2: 'Message two'
        }
      }
    })
    // Add some more messages
    banana.load({
      message_2: 'Message two - new',
      message_3: 'Message three'
    }, 'ca')
    assert.strictEqual(banana.i18n('message_1'), 'Message one')
    assert.strictEqual(banana.i18n('message_2'), 'Message two - new')
    assert.strictEqual(banana.i18n('message_3'), 'Message three')
  })

  it('should parse the plural and gender', () => {
    let locale = 'en'
    const banana = new Banana(locale, {})
    const messages = fs.readFileSync(`${__dirname}/i18n/${locale}.json`)
    banana.load(JSON.parse(messages), locale)
    assert.strictEqual(
      banana.i18n('This message key does not exist'),
      'This message key does not exist',
      'This message key does not exist'
    )
    assert.strictEqual(banana.i18n('Hello $1', 'Bob'), 'Hello Bob', 'Parameter replacement')
    const pluralAndGenderMessage = '$1 has $2 {{plural:$2|kitten|kittens}}. ' +
      '{{gender:$3|He|She}} loves to play with {{plural:$2|it|them}}.'
    const pluralAndGenderMessageWithLessParaMS = '$1 has $2 {{plural:$2|kitten}}. ' +
      '{{gender:$3|He|She}} loves to play with {{plural:$2|it}}.'
    const pluralAndGenderMessageWithCase = '$1 has $2 {{plURAl:$2|kitten}}. ' +
      '{{genDER:$3|He|She}} loves to play with {{pLural:$2|it}}.'
    const pluralAndGenderMessageWithSyntaxError = '$1 has $2 {{plural:$2|kitten}. ' +
      '{{gender:$3|He|She}} loves to play with {plural:$2|it}}.'
    const pluralAndGenderMessageWithSyntaxError2 = '$1 has $2 {{plural:$2|kitten}}. ' +
      '{gender:$3|He|She}} loves to play with {plural:$2|it}}.'
    assert.strictEqual(
      banana.i18n(pluralAndGenderMessage, 'Meera', 1, 'female'),
      'Meera has 1 kitten. She loves to play with it.',
      'Plural and gender test - female, singular'
    )
    assert.throws(
      function () {
        banana.i18n(pluralAndGenderMessageWithSyntaxError, 'Meera', 1, 'female')
      },
      /Parse error at position 10/,
      'Message has syntax error'
    )
    assert.throws(
      function () {
        banana.i18n(pluralAndGenderMessageWithSyntaxError2, 'Meera', 1, 'female')
      },
      /Parse error at position 32/,
      'Message has syntax error'
    )
    assert.strictEqual(
      banana.i18n(pluralAndGenderMessageWithLessParaMS, 'Meera', 1, 'female'),
      'Meera has 1 kitten. She loves to play with it.',
      'Plural and gender test - female, singular, but will less parameters in message'
    )
    assert.strictEqual(
      banana.i18n(pluralAndGenderMessageWithCase, 'Meera', 1, 'female'),
      'Meera has 1 kitten. She loves to play with it.',
      'Plural and gender test - female, singular. Plural, gender keywords with upper and lower case'
    )
    assert.strictEqual(
      banana.i18n(pluralAndGenderMessage, 'Meera', 1, 'randomtext'),
      'Meera has 1 kitten. He loves to play with it.',
      'Plural and gender test - wrong gender- fallback to fist gender'
    )
    assert.strictEqual(
      banana.i18n(pluralAndGenderMessage),
      '$1 has $2 kittens. He loves to play with them.',
      'Plural and gender test - no params passed. Should not fail'
    )
    assert.strictEqual(
      banana.i18n(pluralAndGenderMessage, 'Meera', 1, 'randomtext', 'extraparam'),
      'Meera has 1 kitten. He loves to play with it.',
      'Plural and gender test - more params passed. Should not fail'
    )
    assert.strictEqual(
      banana.i18n(pluralAndGenderMessage, 'Harry', 2, 'male'),
      'Harry has 2 kittens. He loves to play with them.',
      'Plural and gender test - male, plural'
    )
    assert.strictEqual(
      banana.i18n('This costs $1.'),
      'This costs $1.',
      'No parameter supplied, $1 appears as is'
    )
  })

  it('should parse the Arabic message', () => {
    const locale = 'ar'
    const banana = new Banana(locale)
    assert.strictEqual(banana.locale, 'ar', 'Locale is Arabic')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 1), 'one',
      'Arabic plural test for one')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', '٠'), 'zero',
      'Arabic plural test for arabic digit zero')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 2), 'two',
      'Arabic plural test for two')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 3), 'few',
      'Arabic plural test for few')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', '٨'), 'few',
      'Arabic plural test for few')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 9), 'few',
      'Arabic plural test for few')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 110), 'few',
      'Arabic plural test for few')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 11), 'many',
      'Arabic plural test for many')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 15), 'many',
      'Arabic plural test for many')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 99), 'many',
      'Arabic plural test for many')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 9999), 'many',
      'Arabic plural test for many')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 100), 'other',
      'Arabic plural test for other')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 102), 'other',
      'Arabic plural test for other')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 1000), 'other',
      'Arabic plural test for other')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', 1.7), 'other',
      'Arabic decimal plural test for one')
    assert.strictEqual(banana.i18n('{{plural:$1|zero|one|two|few|many|other}}', '٠١٢٣٤٥٦٧٨٩'), 'many',
      'Arabic plural test for ۰۱۲۳۴۵۶۷۸۹')
  })

  it('should parse explicit plural forms correctly', () => {
    // eslint-disable-next-line new-cap
    const banana = new Banana('en')
    const language = banana.parser.emitter.language
    assert.strictEqual(language.convertPlural(0, ['0=Explicit Zero', 'Singular', 'Plural']),
      'Explicit Zero', 'Explicit Zero')

    assert.strictEqual(language.convertPlural(1, ['0=Explicit Zero', 'Singular', 'Plural', '1=Explicit One']),
      'Explicit One', 'Explicit One')

    assert.strictEqual(language.convertPlural(3, ['0=Explicit Zero', '1=Explicit One', 'Singular', 'Plural']),
      'Plural', 'Plural')

    assert.strictEqual(language.convertPlural(1, ['0=Explicit Zero', 'Singular', 'Plural']),
      'Singular', 'Singular')

    // See https://bugzilla.wikimedia.org/69993
    assert.strictEqual(banana.i18n('Found {{PLURAL:$1|$1 results|1=$1 result}}', 1), 'Found 1 result', 'Plural message with explicit plural forms, plural form contains placeholder.')
  })

  it('should use digit transform table and localize digits', function () {
    const langCode = 'fa'
    const banana = new Banana(langCode)
    assert.strictEqual(banana.parser.emitter.locale, langCode, 'Locale is ' + langCode)
    assert.strictEqual(banana.parser.emitter.language.convertNumber('8'), '۸',
      'Persian transform of 8')
    assert.strictEqual(banana.parser.emitter.language.convertNumber('8', true), 8,
      'Persian transform of 8')
    assert.strictEqual(banana.parser.emitter.language.convertNumber('0123456789'), '۰۱۲۳۴۵۶۷۸۹',
      'Persian transform of 0123456789')
    assert.strictEqual(banana.parser.emitter.language.convertNumber('۰۱۲۳۴۵۶۷۸۹', true), 123456789,
      'Persian transform of 0123456789')
  })

  it('should localize the messages with bidi arguments', () => {
    const banana = new Banana('he')
    banana.load({
      'greet-msg': 'שלום {{bidi:$1}} הי!'
    }, 'he')
    assert.strictEqual(
      banana.i18n('greet-msg', '123'),
      'שלום ' + '123' + ' הי!',
      'Bidi with neutral argument'
    )
    assert.strictEqual(
      banana.i18n('greet-msg', 'Ben_(WMF)'),
      'שלום ' + '\u202A' + 'Ben_(WMF)' + '\u202C' + ' הי!',
      'Bidi with LTR argument'
    )
    assert.strictEqual(
      banana.i18n('greet-msg', 'יהודי (מנוחין)'),
      'שלום ' + '\u202B' + 'יהודי (מנוחין)' + '\u202C' + ' הי!',
      'Bidi with RTL argument'
    )
  })

  it('should localize the messages with wiki liinks', () => {
    const banana = new Banana('en', { wikilinks: true })
    banana.load({
      'msg-with-extlink': 'This is a link to [https://wikipedia.org wikipedia]',
      'msg-with-wikilink': 'This is a link to [[Apple|Apple Page]]',
      'msg-with-wikilink-no-anchor': 'This is a link to [[Apple]]'
    }, 'en')
    assert.strictEqual(
      banana.i18n('msg-with-extlink'),
      'This is a link to <a href="https://wikipedia.org">wikipedia</a>',
      'External link'
    )
    assert.strictEqual(
      banana.i18n('msg-with-wikilink'),
      'This is a link to <a href="./Apple" title="Apple">Apple Page</a>',
      'Internal Wiki style link with link and title being different'
    )
    assert.strictEqual(
      banana.i18n('msg-with-wikilink-no-anchor'),
      'This is a link to <a href="./Apple" title="Apple">Apple</a>',
      'Internal Wiki style link with link and title being same'
    )
  })

  it('should skip wiki links if disabled', () => {
    const banana = new Banana('en', { wikilinks: false })
    banana.load({
      'msg-with-extlink': 'This is reference [10]',
      'msg-with-wikilink': '$1 more {{plural:$1|item|items}} [[...]]'
    }, 'en')
    assert.strictEqual(
      banana.i18n('msg-with-extlink'),
      'This is reference [10]'
    )
    assert.strictEqual(
      banana.i18n('msg-with-wikilink', 10),
      '10 more items [[...]]'
    )
  })

  for (var langCode in grammarTests) {
    grammarTest(langCode, grammarTests[langCode])
  }

  it('should localize the messages with bidi arguments', () => {
    const fallbacks = new Banana('uk').getFallbackLocales()
    assert.deepStrictEqual(
      fallbacks,
      ['ru', 'en'],
      'Correct fallback locales'
    )
  })
})

function grammarTest (langCode, test) {
  it('should correctly apply the grammar for language ' + langCode, () => {
    const banana = new Banana(langCode)
    assert.strictEqual(banana.locale, langCode, 'Locale is ' + langCode)
    for (let i = 0; i < test.length; i++) {
      let grammarMessage = '{{GRAMMAR:' + test[i].grammarForm + '|' +
        test[i].word + '}}'
      assert.strictEqual(banana.i18n(grammarMessage), test[i].expected,
        test[i].description)
    }
  })
}
