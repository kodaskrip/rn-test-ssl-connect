import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Content,
  Text,
  Footer,
  FooterTab,
  Form,
  Item,
  Input,
  Toast
} from 'native-base';
import { create } from 'apisauce';

import config from './Constant';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      showToast: false,
      loginFailed: false,
      loginSuccess: false,
      errorMessage: ''
    };
  }

  _login = () => {
    this.setState({
      showToast: false,
      loginFailed: false,
      loginSuccess: false
    });

    const api = create({
      baseURL: config.baseUrl
    });

    api
      .post(
        '/idp/user.auth',
        {
          userName: this.state.username,
          userPassword: this.state.password
        },
        {
          headers: config.commonHeaders
        }
      )
      .then(response => {
        if ('SUCCESS'.trim() === response.data.responseType) {
          this.setState({
            loginSuccess: true,
            showToast: true
          });
        } else {
          this.setState({
            loginFailed: true,
            showToast: true
          });
        }
      })
      .catch(err => {
        alert(err);
      });

    // fetch('https://api-dev-1.daya-dms.id/idp/user.auth', {
    //   method: 'POST',
    //   headers: config.commonHeaders,
    //   body: JSON.stringify({
    //     userName: this.state.username,
    //     userPassword: this.state.password
    //   })
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log(responseJson);
    //     if ('SUCCESS'.trim() === responseJson.responseType) {
    //       this.setState({
    //         loginSuccess: true,
    //         showToast: true
    //       });
    //     } else {
    //       this.setState({
    //         loginFailed: true,
    //         showToast: true
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     this.setState({
    //       loginFailed: true,
    //       showToast: true,
    //       errorMessage: error
    //     });
    //   });
  };

  _handleUsername = text => {
    this.setState({
      username: text
    });
  };

  _handlePassword = text => {
    this.setState({
      password: text
    });
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>SSL Example</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item>
              <Input
                autoCapitalize="none"
                placeholder="Username"
                onChangeText={this._handleUsername}
              />
            </Item>
            <Item last>
              <Input
                secureTextEntry={true}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={this._handlePassword}
              />
            </Item>
            <Button style={{ margin: 10 }} onPress={this._login}>
              <Text>Sign In</Text>
            </Button>
          </Form>
          {this.state.showToast ? (
            this.state.loginFailed ? (
              <Text style={{ color: 'red', margin: 10 }}>Login Failed</Text>
            ) : (
              <Text style={{ color: 'green', margin: 10 }}>Login SUCCESS</Text>
            )
          ) : null}
          <Text>{this.state.errorMessage}</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
