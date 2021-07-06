/**
 * @format
 */

import 'react-native';
import React from 'react';
// import App from '../App';
import contactValidation from '../src/validations/contact.validation';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

test('contact Validation', () => {
  expect(contactValidation("joko","susilo","65","fotos")).toEqual("")
  expect(contactValidation("","susilo","65","fotos")).toEqual("firstname can't be empty")
  expect(contactValidation("joko","","65","fotos")).toEqual("lastname can't be empty")
  expect(contactValidation("joko","susilo","","fotos")).toEqual( "age can't be empty")
  expect(contactValidation("joko","susilo","65","")).toEqual( "image can't be empty")
})


test('contact Validation', () => {
  expect(contactValidation("joko","susilo","65","fotos")).toEqual("")
  expect(contactValidation("","susilo","65","fotos")).toEqual("firstname can't be empty")
  expect(contactValidation("joko","","65","fotos")).toEqual("lastname can't be empty")
  expect(contactValidation("joko","susilo","","fotos")).toEqual( "age can't be empty")
  expect(contactValidation("joko","susilo","65","")).toEqual( "image can't be empty")
})