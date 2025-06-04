import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateCharacterDto } from '@character/dto';
import { Affiliation, Specie } from '@prisma/client';
import { CharacterExample } from '@shared/decorators/docs/examples/character.example';
import { ErrorExample } from '@shared/decorators';

export const ApiCreateCharacter = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new character',
      description: 'Endpoint for create character',
    }),
    ApiBody({
      type: CreateCharacterDto,
      description: 'Create a new character',
      examples: {
        valid: {
          summary: 'Valid registration example',
          value: {
            name: 'John',
            specie: Specie.YODA_SPECIES,
            affiliation: Affiliation.MANDALORIANS,
            homePlanetId: 'f395099b-1198-4805-9363-1cbafa5e20d0',
          },
        },
        invalid: {
          summary: 'Invalid registration example',
          value: {
            name: 1,
            specie: 1,
            affiliation: 1,
          },
        },
        empty: {
          value: {
            name: '',
            specie: '',
            affiliation: '',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'Create a new character',
      example: CharacterExample('Personagem criado com sucesso'),
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      example: ErrorExample({
        error: 'Bad Request',
        statusCode: 400,
        message: [
          'name must be a string',
          'name should not be empty',
          'specie should not be empty',
          'specie must be one of the following values: HUMAN, CHISS, TWILEK, ZABRAK, MIRIALAN, MIRALUKA, KEL_DOR, PANTORAN, ANAKIN, WOOKIEE, TOGRUTA, TRANDOSHAN, NAUTOLAN, MON_CALAMARI, RODIAN, BITH, GRAN, GAMORREAN, YODA_SPECIES, SITH_PUREBLOOD, ZELTRON, GEONOSIAN, NEIMOIDIAN, KAMINOAN, UMBARAN, HUTT, DUG, TUSKEN, EWOK, JAWA, GUNGAN, MANDALORIAN, SITH, DROID_ASTROMECH, DROID_PROTOCOL, DROID_BATTLE, DROID_ASSASSIN',
          'affiliation should not be empty',
          'affiliation must be one of the following values: GALACTIC_REPUBLIC, GALACTIC_EMPIRE, FIRST_ORDER, NEW_REPUBLIC, CONFEDERACY_OF_INDEPENDENT_SYSTEMS, REBEL_ALLIANCE, RESISTANCE, HUTT_CARTEL, CRIMSON_DAWN, JEDI_ORDER, SITH_ORDER, JEDI_TEMPLE_GUARD, INQUISITORIUS, KNIGHTS_OF_REN, NIGHTSISTERS, WHILLS, CLONE_TROOPERS, STORMTROOPERS, DEATH_WATCH, BOUNTY_HUNTERS_GUILD, REBEL_CELL, PHOENIX_SQUADRON, ROGUE_SQUADRON, BLACK_SUN, PYKE_SYNDICATE, BOUNTY_HUNTERS, SMUGGLERS, PIRATES, MANDALORIANS, EWOKS, GUNGANS, TUSKEN_RAIDERS, JEDI_ARCHIVES, NEUTRAL, INDEPENDENT, MERCENARY, SCUM_AND_VILLAINY, DROID_ARMY, TRADE_FEDERATION, TECHNICAL_UNION',
          'homePlanetId must be a string',
          'homePlanetId should not be empty',
        ],
      }),
    }),
    ApiNotFoundResponse({
      description: 'Planet not found',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message: 'Planeta não encontrado',
      }),
    }),
  );
};
