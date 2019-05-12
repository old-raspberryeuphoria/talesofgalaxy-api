import diacritics from 'diacritics';

export default val => diacritics.remove(val.toLowerCase()).replace(/[^a-zA-Z0-9]/g, '-');
