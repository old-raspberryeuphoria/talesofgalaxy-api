import diacritics from 'diacritics';

export default val => diacritics.remove(val.toLowerCase()).replace(/\s+/g, '-');
