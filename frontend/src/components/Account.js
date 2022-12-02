import React from "react";
import {LogoutOutlined} from '@ant-design/icons'

export default function Account({
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
}) {

  let accountButtonInfo;
  if (web3Modal?.cachedProvider) {
    accountButtonInfo = { name: 'Logout', action: logoutOfWeb3Modal };
  } else {
    accountButtonInfo = { name: 'Connect', action: loadWeb3Modal };
  }


  return (
    <div >
      {web3Modal && (
        <a
          style={{ borderRadius:'0.35rem',fontSize:'1rem',fontWeight:'500',}}
          onClick={accountButtonInfo.action}
        >
          <LogoutOutlined /> {accountButtonInfo.name}
        </a>
      )}
    </div>
  );
}
