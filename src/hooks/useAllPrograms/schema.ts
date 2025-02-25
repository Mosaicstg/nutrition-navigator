import * as v from 'valibot';

export const ProgramSchema = v.object({
  id: v.number('Program does not have an ID'),
  'program-name': v.string('Program does not a have name.'),
  url: v.string('Program does not a URL field.'),
  latitude: v.number('Program needs to have a latitude field.'),
  longitude: v.number('Program needs to have a longitude field.'),
  'organization-name': v.string(
    'Program needs to have an Organization post assigned. Or the Organization assigned does not have a name.'
  ),
  'organization-url': v.string(
    'Program needs to have an Organization post assigned. Or the Organization does not have a URL'
  ),
  'program-types': v.array(
    v.string(
      'Every Program Type should be a string of the slug of the Program Type taxonomy.'
    )
  ),
  audiences: v.array(
    v.string(
      'Every Audience should be a string of the slug of the Audience taxonomy.'
    )
  ),
  venues: v.array(
    v.string(
      'Every Venue should be a string of the slug of the Venue taxonomy.'
    )
  ),
  regions: v.array(
    v.string(
      'Every Region should be a string of the slug of the Regions taxonomy term.'
    )
  ),
  languages: v.array(
    v.string(
      'Every Language should be a string of the slug of the Languages taxonomy term.'
    )
  ),
  description: v.optional(v.string('Program description should be a string.')),
  address: v.optional(v.string('Program address should be a string.')),
  name: v.optional(v.string('Program name should be a string.')),
  'contact-phone': v.optional(
    v.string('Program contact phone field should be a string.')
  ),
  'contact-email': v.optional(
    v.string('Program contact email field should be a string.')
  ),
  'dates-times-offered': v.optional(
    v.string('Program Date And Times offered field should be a string.')
  ),
  'zip-code': v.optional(v.string('Program Zip Code field should be a string'))
});
