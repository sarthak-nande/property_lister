import { describe, expect, it } from 'vitest';
import { userRegistrationSchema, validateUserRegistration } from '../services/user/zod/user.validation.js';

describe('user registration validation', () => {
  const validPayload = {
    basicInfo: {
      firstName: 'Aman',
      lastName: 'Kumar',
      email: 'aman@example.com',
      password: 'Password123',
      phone: '+919876543210'
    },
    role: 'RENTER'
  };

  it('accepts a valid registration payload', () => {
    const result = userRegistrationSchema.safeParse(validPayload);

    expect(result.success).toBe(true);
  });

  it('rejects a payload with an invalid email', () => {
    const result = validateUserRegistration({
      ...validPayload,
      basicInfo: {
        ...validPayload.basicInfo,
        email: 'bad-email'
      }
    });

    expect(result.success).toBe(false);
  });

  it('rejects a payload missing required user fields', () => {
    const result = validateUserRegistration({
      basicInfo: {
        firstName: 'Aman'
      }
    });

    expect(result.success).toBe(false);
  });
});