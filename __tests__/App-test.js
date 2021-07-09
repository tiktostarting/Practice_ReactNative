/**
 * @format
 */

import 'react-native';
import React from 'react';
import contactValidation from '../src/validations/contact.validation';

test('contact Validation', () => {
  expect(contactValidation("joko","susilo","65","fotos")).toEqual("")
  expect(contactValidation("","susilo","65","fotos")).toEqual("first name just accept alphanumeric")
  expect(contactValidation("joko","","65","fotos")).toEqual("last name just accept alphanumeric")
  expect(contactValidation("joko","susilo","","fotos")).toEqual( "age can't be empty")
  expect(contactValidation("joko","susilo","65","")).toEqual( "image can't be empty")
})
