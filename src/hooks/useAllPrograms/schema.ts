import { z } from 'zod';

export const ProgramSchema = z.object({
  id: z.number({
    required_error: 'Program does not have an ID',
    invalid_type_error: 'Program ID is not a number'
  }),
  'program-name': z.string({
    required_error: 'Program does not a have name.',
    invalid_type_error: 'Program name is not a string.'
  }),
  url: z.string({
    required_error: 'Program does not a URL field.',
    invalid_type_error: 'Program URL is not a string.'
  }),
  latitude: z.number({
    required_error: 'Program needs to have a latitude field.',
    invalid_type_error: 'Program latitude field is not a float/number.'
  }),
  longitude: z.number({
    required_error: 'Program needs to have a longitude field.',
    invalid_type_error: 'Program longitude field is not a float/number.'
  }),
  'organization-name': z.string({
    required_error:
      'Program needs to have an Organization post assigned. Or the Organization assigned does not have a name.',
    invalid_type_error: 'Program organization name is not a string.'
  }),
  'organization-url': z.string({
    required_error:
      'Program needs to have an Organization post assigned. Or the Organization does not have a URL',
    invalid_type_error: 'Program organization URL is not a string'
  }),
  'program-types': z.array(
    z.string({
      invalid_type_error:
        'Every Program Type should be a string of the slug of the Program Type taxonomy.'
    })
  ),
  audiences: z.array(
    z.string({
      invalid_type_error:
        'Every Audience should be a string of the slug of the Audience taxonomy.'
    })
  ),
  venues: z.array(
    z.string({
      invalid_type_error:
        'Every Venue should be a string of the slug of the Venue taxonomy.'
    })
  ),
  description: z
    .string({
      invalid_type_error: 'Program description should be a string.'
    })
    .optional(),
  address: z
    .string({
      invalid_type_error: 'Program address should be a string.'
    })
    .optional(),
  name: z
    .string({
      invalid_type_error: 'Program name should be a string.'
    })
    .optional(),
  'contact-phone': z
    .string({
      invalid_type_error: 'Program contact phone field should be a string.'
    })
    .optional(),
  'contact-email': z
    .string({
      invalid_type_error: 'Program contact email field should be a string.'
    })
    .optional(),
  'dates-times-offered': z
    .string({
      invalid_type_error:
        'Program Date And Times offered field should be a string.'
    })
    .optional(),
  'zip-code': z
    .string({
      invalid_type_error: 'Program Zip Code field should be a string'
    })
    .optional()
});

export const FiltersSchema = z.object({
  'program-types': z.string().array(),
  venues: z.string().array(),
  audiences: z.string().array(),
  'organization-name': z.string(),
  address: z.string()
});
