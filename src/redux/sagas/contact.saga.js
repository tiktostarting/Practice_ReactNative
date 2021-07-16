import { takeLatest, call, put, take, all, takeEvery } from 'redux-saga/effects'

import { INITIATE_CONTACTS, InitiateContactsSuccess, InitiateContactsError,
            UPDATE_CONTACT, UpdateContactSuccess, UpdateContactError,
            DELETE_CONTACT, DeleteContactSuccess, DeleteContactError
        } from "../actions/contact.action"

import {getContacts, updateContact, deleteContact} from "../../services/contactlist.service"

function* fetchContacts() {
    try {
        const contacts = yield call(getContacts)
        yield put(InitiateContactsSuccess(contacts.data))
    } catch (error) {
        yield put(InitiateContactsError(error.message))
    }
}

function* updateContacts(action) {
    console.log("passing isn't error ",action)
    try {
        const contacts = yield call(updateContact, action.data.id, action.data.newcontact)
        console.log("ini di saga => ", contacts)
        yield put(UpdateContactSuccess(contacts.data))
    } catch (error) {
        console.log(error)
        yield put(UpdateContactError(error.message))
    }
}

function* deleteContacts(id) {
    try {
        const contacts = yield call(deleteContact, id)
        yield put(DeleteContactSuccess(contacts.data))
    } catch (error) {
        yield put(DeleteContactError(error.message))
    }
}

function* watchContacts() {

    yield takeLatest(INITIATE_CONTACTS, fetchContacts)
    yield takeLatest(UPDATE_CONTACT, action => updateContacts(action))
    yield takeLatest(DELETE_CONTACT, deleteContacts)

}

export default watchContacts