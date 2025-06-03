export const CharacterExample = (message: string) => {
  return {
    message: message,
    data: {
      id: '835dd03e-50ac-47f0-b8c2-edc149ee205d',
      name: 'John',
      specie: 'YODA_SPECIES',
      affiliation: 'MANDALORIANS',
      homePlanet: {
        id: 'f395099b-1198-4805-9363-1cbafa5e20d0',
        name: 'Marte',
        climate: 'TEMPERATE',
        terrain: 'GRASSLANDS',
        population: '1',
        StarSystems: {
          id: '5ebfe608-bc55-4f66-a2ab-7652de1456b7',
          name: 'Sistema Solar',
          description: 'Nosso sistema',
        },
      },
    },
  };
};
