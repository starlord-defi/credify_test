import React, { useEffect, useState, useCallback } from 'react';
import Web3ModalSetup from './helpers/Web3ModalSetup';
import Account from './components/Account';
import ThemeSwitcher from './components/ThemeSwitch';
import Address from './components/Address';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  setAddress,
  loadUserData
} from './store/slices/accountSlice';
import './styles/color.css';
import './styles/navbar.css';

import logo from './images/logo.png';
import name from './images/name.png';
import { Button, Layout, Switch } from 'antd';
import { Tabs } from 'antd';
import Dashboard from './components/Dashboard';
import Borrow from './components/Borrow';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import { shortenAddress } from './helpers/ShortenAddress';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { message } from 'antd';
import { CopyOutlined, ExportOutlined, SettingFilled } from '@ant-design/icons';
import { Select } from 'antd';
import BorrowersApplication from './components/BorrowersApplication';
import Lend from './components/Lend';

const { Option } = Select;
const { TabPane } = Tabs;
const { Header, Footer, Content } = Layout;
const { ethers } = require('ethers');
const web3Modal = Web3ModalSetup();

const copysuccess = () => {
  message.success('Address Copied');
};

export default function Dapp() {
  const dispatch = useDispatch();
  const address = useSelector(state => state.account.address);

  const [injectedProvider, setInjectedProvider] = useState();
  const [currentNetwork, setCurrentNetwork] = useState('Ganache');
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = flag => {
    setVisible(flag);
  };

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (
      injectedProvider &&
      injectedProvider.provider &&
      typeof injectedProvider.provider.disconnect == 'function'
    ) {
      await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  const loadWeb3Modal = useCallback(async () => {
    let provider = null;
    let addr = null;
    let pro = null;
    let chainId = null;
    let signer_temp = null;
    let chainData = null;
    let disProps = null;

    try {
      provider = await web3Modal.connect();
      pro = new ethers.providers.Web3Provider(provider);
      await pro.send('eth_requestAccounts', []);
      signer_temp = pro.getSigner();
      addr = await signer_temp.getAddress();
      chainData = await pro.getNetwork();
      chainId = chainData.chainId;
      if (chainData.name == 'unknown') {
        setCurrentNetwork('Ganache');
      } else {
        setCurrentNetwork(chainData.name);
      }

      console.log(addr);
    } catch (err) {
      console.log('Error in loadWeb3Modal web3Modal connect: ', err);
    }

    try {
      setInjectedProvider(pro);
      dispatch(setAddress({ address: addr }));
      disProps = {
        pro: pro,
        addr: addr
      }
      dispatch(loadUserData(disProps))
    } catch (err) {
      console.log('Error in Dispatch and setInjectedProvider: ', err);
    }

    try {
      disProps = { pro: pro, addr: addr };
    } catch (err) { }

    provider.on('chainChanged', chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      pro = new ethers.providers.Web3Provider(provider);
      setInjectedProvider(pro);
    });

    provider.on('accountsChanged', async () => {
      console.log(`account changed!`);
      pro = new ethers.providers.Web3Provider(provider);
      await pro.send('eth_requestAccounts', []);
      const signer_temp = pro.getSigner();
      let addr = await signer_temp.getAddress();
      chainData = await pro.getNetwork();
      chainId = chainData.chainId;
      console.log(addr);
      setInjectedProvider(pro);
      dispatch(setAddress({ address: addr }));
    });

    // Subscribe to session disconnection
    provider.on('disconnect', (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
    // eslint-disable-next-line
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  let wrapperFunction = () => {
    //do something
    navigator.clipboard.writeText(address);
    //do something
    copysuccess();
  };

  const alignmenucss = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const menu = (
    <Menu
      items={[
        {
          label: <code>Network:{currentNetwork}</code>,
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: (
            <a onClick={wrapperFunction}>
              <CopyOutlined /> Copy Address
            </a>
          ),
          key: '1',
        },
        {
          label: (
            <a
              href={`https://${currentNetwork}.etherscan.io/address/${address}`}
              target='_blank'
            >
              <ExportOutlined /> View on Explorer
            </a>
          ),
          key: '2',
        },
        {
          label: (
            <Account
              web3Modal={web3Modal}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
            />
          ),
          key: '3',
        },
      ]}
    />
  );

  const globalMenu = (
    <Menu
      items={[
        {
          label: <code>Global Settings</code>,
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: (
            <div style={alignmenucss}>
              Dark Mode <ThemeSwitcher />
            </div>
          ),
          key: '1',
        },
        {
          label: (
            <div style={alignmenucss}>
              Testnet Mode <Switch />
            </div>
          ),
          key: '2',
        },
        {
          label: (
            <div>
              Language
              <Select defaultValue='English' bordered={false}>
                <Option value='English'>English</Option>
                <Option value='Hindi'>Hindi</Option>
                <Option value='Kannada'>Kannada</Option>
              </Select>
            </div>
          ),
          key: '3',
        },
      ]}
    />
  );

  let accountButtonInfo = { name: 'Connect', action: loadWeb3Modal };

  return (
    <div className='Dapp'>
      <Router>
        <Layout>
          <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '54px',
            }}
          >
            <div>
              <img src={logo} width={30} />
              <img src={name} width={100} />
            </div>
            <div>
              <input type='checkbox' id='nav-toggle' className='nav-toggle' />
              <nav>
                <ul>
                  <li>
                    <NavLink className='navlink' to='/'>
                      Credit Score
                    </NavLink>
                    <NavLink className='navlink' to='/borrow'>
                      Borrow
                    </NavLink>
                    <NavLink className='navlink' to='/lend'>
                      Lend
                    </NavLink>
                    <NavLink className='navlink' to='/list'>
                      List Of Applications
                    </NavLink>
                    <NavLink className='navlink' to='/about'>
                      About Us
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <label htmlFor='nav-toggle' className='nav-toggle-label'>
                <span></span>
              </label>
            </div>
            <div>
              {web3Modal?.cachedProvider ? (
                <Dropdown
                  className='user-dropdown'
                  overlay={menu}
                  trigger={['click']}
                >
                  <a onClick={e => e.preventDefault()}>
                    <Space>
                      <Avatar
                        size='small'
                        icon={<UserOutlined />}
                        style={{ marginBottom: '0.3rem' }}
                      />
                      {address ? (
                        <code>
                          {' '}
                          <Address address={shortenAddress(address)} />
                        </code>
                      ) : (
                        'Connect Wallet'
                      )}
                      <DownOutlined style={{ color: 'white' }} />
                    </Space>
                  </a>
                </Dropdown>
              ) : (
                <Button
                  className='wallet-connect-btn'
                  type='primary'
                  onClick={accountButtonInfo.action}
                >
                  Connect Wallet
                </Button>
              )}

              <Dropdown
                overlay={globalMenu}
                trigger={['click']}
                onVisibleChange={handleVisibleChange}
                visible={visible}
              >
                <a onClick={e => e.preventDefault()}>
                  <SettingFilled className='settings-icon' />
                </a>
              </Dropdown>
            </div>
          </Header>

          <Routes>
            <Route
              path='/'
              element={<Dashboard provider={injectedProvider} />}
            />
          </Routes>

          <Routes>
            <Route path='/borrow' element={<Borrow provider={injectedProvider} />} />
          </Routes>

          <Routes>
            <Route path='/list' element={<BorrowersApplication provider={injectedProvider} />} />
          </Routes>

          <Routes>
            <Route path='/lend' element={<Lend provider={injectedProvider} />} />
          </Routes>

          <Footer
            style={{
              background: '#191919',
              color: 'white',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            Ⓒ CREDIFY 2022
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}
