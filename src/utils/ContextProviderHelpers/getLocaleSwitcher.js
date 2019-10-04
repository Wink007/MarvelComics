export default (config, location, locale, updateState) => {
  const {
    pathname: spoiled = '/',
  } = location;
  const locales = config.locales;

  const amend = (first, second, ...rest) => {
    const isSpoiled = !!locales.find(l => l.localePath === `/${second}`);
    return isSpoiled ? `/${rest.join('/')}` : `/${[second, ...rest].join('/')}`;
  };

  const pathname = amend(...spoiled.split('/'));

  return {
    pathname,
    locales,
    locale,
    updateState,
  };
};
