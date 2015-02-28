describe("URL parsing", function() {
  it("defaults to San Francisco and Melbourne", function() {
    expect(Url.get()).toBe('melbourne/sanfrancisco/');
  });

  it("allows allows you to add a city to the url", function() {
    Url.set(Url.defaultCities);

    Url.addCity('johannesburg');
    expect(Url.get()).toBe(Url.defaultCities + "johannesburg/");
  });

  it("allows allows you to remove a city form the url", function() {
    Url.set(Url.defaultCities);

    Url.addCity('johannesburg');
    expect(Url.get()).toBe(Url.defaultCities + "johannesburg/");

    Url.removeCity('johannesburg');
    expect(Url.get()).toBe(Url.defaultCities);
  });

  it("can fetch location.hash without hash", function() {
    Url.set("capetown/london/");
    expect(Url.get()).toBe('capetown/london/')
  });

  it("sets urlCities on load", function() {
    expect(urlCities).toContain('sanfrancisco');
  });
});
