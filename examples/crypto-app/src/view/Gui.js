import React, { Component } from 'react';
import logo from '../logo.png';
import {encrypt, encryptNoKey, decrypt} from "../controller/SecurityController";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: {
                value: '',
                className: 'form-control'
            },
            pass: {
                value: '',
                className: 'form-control'
            },
            result: {
                value: '',
                className: 'form-control'
            },
            key: {
                value: '',
                type: 'password',
                className: 'form-control'
            },
            decryptIsDisabled: true,
        };

        this.keyPromise = null;

        this.iv = window.crypto.getRandomValues(new Uint8Array(128));
        this.additionalData = new ArrayBuffer(128);
        this.tagLen = 128;

        this.changeValue = this.changeValue.bind(this);
        this.reset = this.reset.bind(this);
        this.togglePassword = this.togglePassword.bind(this);
    };

    reset() {
        this.setState({
            text: {
                value: '',
                className: 'form-control'
            },
            pass: {
                value: '',
                className: 'form-control'
            },
            result: {
                value: '',
                className: 'form-control'
            },
            key: {
                value: '',
                type: 'password',
                className: 'form-control'
            },
            decryptIsDisabled: true,
        });
    }

    changeValue(event) {
        let target = event.target;
        let targetName = event.target.name;
        this.setState({
            [targetName]: {
                value: target.value,
                className: 'form-control'
            }
        });
    }

    togglePassword() {
        this.setState({
            key: {
                value: this.state.key.value,
                className: this.state.key.className,
                type: this.state.key.type === 'password' ? 'text' : 'password',
            }
        })
    }

    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'col-12 col-md-6'}>
                        <div className={'form-group'}>
                            <label htmlFor={'text'}>
                                Text:
                            </label>
                            <textarea
                                id={'text'}
                                className={this.state.text.className}
                                value={this.state.text.value}
                                name={'text'}
                                onInput={(e) => this.changeValue(e)}
                                rows={8}
                            >
                            </textarea>
                            <div className={'invalid-feedback'}>
                                This field is required
                            </div>
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor={'pass'}>
                                Password:
                            </label>
                            <input
                                type={'text'}
                                id={'pass'}
                                className={this.state.pass.className}
                                value={this.state.pass.value}
                                name={'pass'}
                                onInput={(e) => this.changeValue(e)}
                            />
                            <div className={'invalid-feedback'}>
                                This field is required
                            </div>
                        </div>
                    </div>
                    <div className={'col-12 col-md-6'}>
                        <div className={'form-group'}>
                            <label htmlFor={'result'}>
                                Result:
                            </label>
                            <textarea
                                id={'result'}
                                disabled={'disabled'}
                                className={this.state.result.className}
                                rows={'8'}
                                name={'result'}
                                value={this.state.result.value}
                                onInput={(e) => this.changeValue(e)}
                            >

                            </textarea>
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor={'key'}>
                                Key used:
                            </label>
                            <div className={'input-group'}>
                                <input
                                    type={this.state.key.type}
                                    id={'key'}
                                    className={this.state.key.className}
                                    value={this.state.key.value}
                                    name={'key'}
                                    disabled={'disabled'}
                                />
                                <div className={'input-group-append'}>
                                    <span className={'input-group-text'} onClick={(e) => this.togglePassword()}><i className={'fa fa-eye'}></i></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <hr></hr>
                <div className={'row my-5 align-items-center'}>
                    <div className={'col-12 col-md-0 col-lg-4'}>
                        <div className={'d-none d-lg-block'}>
                            <p>Encrypt and Decrypt with autogenerated key:</p>
                        </div>
                        <div className={'mt-4 d-none d-lg-block'}>
                            <p>Encrypt and Decrypt using your key:</p>
                        </div>
                    </div>
                    <div className={'col-12 col-md-6 col-lg-4 text-center'}>
                        <div>
                            <button id={'submit'} className={'btn btn-success w-50'} onClick={(e) => encryptNoKey(this, this.state.text.value)}>
                                Encrypt <small>(no key)</small>
                            </button>
                        </div>
                        <div className={'mt-4'}>
                            <button id={'submit'} className={'btn btn-success w-50'} onClick={(e) => encrypt(this, this.state.pass.value, this.state.text.value)}>
                                Encrypt <small>(use key)</small>
                            </button>
                        </div>
                    </div>
                    <div className={'col-12 col-md-6 col-lg-4 text-center text-md-left'}>
                        <div>
                            <button disabled={this.state.decryptIsDisabled} id={'submit'} className={'btn btn-danger w-50'} onClick={(e) => decrypt(this, this.state.result.value)}>
                                Decrypt <small>(no key)</small>
                            </button>
                        </div>
                        {/*<div className={'my-4'}>
                            <button disabled={this.state.decryptIsDisabled} id={'submit'} className={'btn btn-danger w-50'} onClick={(e) => this.decrypt(this.state.result.value)}>
                                Decrypt <small>(use key)</small>
                            </button>
                        </div>*/}
                    </div>
                </div>
                <hr></hr>
                <div className={'row'}>
                    <div className={'col-12 col-md-6 offset-md-6 col-lg-4 offset-lg-8 text-center text-md-left'}>
                        <button id={'reset'} className={'btn btn-secondary w-50'} onClick={(e) => this.reset()}>
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className={'header my-5'}>
                <div className={'d-inline-block mr-4'}>
                    <img src={logo} alt={'Logo'} className={'logo'}/>
                </div>
                <h1 className={'d-inline-block align-middle'}>Crypto App</h1>
            </div>
        )
    }
}

class Page extends React.Component {
    render() {
        return (
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <Header/>
                        <Form/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Page;