import Get from './Get';
import Post from './Post';
// import Put from './Put';
// import Delete from './Delete';
// GET
const products = () => Get(process.env.REACT_APP_API_LIST_PRODUCT_MEMBER, false, null);
const point = (id, token) => Get(process.env.REACT_APP_API_POINT + id, false, token);
const productDetail = (id) => Get(process.env.REACT_APP_API_PRODUCT+id, false,null);
const accountCash = (token) => Get(process.env.REACT_APP_API_ACCOUNT_CASHS, false, token) ;
const agents = () => Get(process.env.REACT_APP_API_AGENTS, false, null);
const members = (token) => Get(process.env.REACT_APP_API_MEMBER, false, token);
const agentShow = (id, token) => Get(process.env.REACT_APP_API_AGENT_SHOW + id, false,token)
const paketMembers = (token) => Get(process.env.REACT_APP_API_PACKAGES_MEMBER, false, token);
const historypoint = (id, token) => Get(process.env.REACT_APP_API_HISTORY_POINT + id, false, token);
const historyorder = (id, token) => Get(process.env.REACT_APP_API_HISTORY_ORDER + id, false, token);
const historyin = (id, token) => Get(process.env.REACT_APP_API_HISTORY_ORDER_AGENT + id, false, token);
const stok = (id, token) => Get(process.env.REACT_APP_API_PRODUCT_STOCK + id, false, token);
const historyordercancel = (id, token) => Get(process.env.REACT_APP_API_ORDER_CANCEL + id, false, token);
const historyorderupdate = (id, token) => Get(process.env.REACT_APP_API_DELIVERY_MEMBER_UPDATE + id , false, token);
const downline = (id, token) => Get(process.env.REACT_APP_API_DOWNLINE + id, false, token);
const deliveryproses = (id, token) => Get(process.env.REACT_APP_API_ORDER_AGENT_PROCESS + id, false, token);
const deliveryupdate = (id, token) => Get(process.env.REACT_API_AGENT_UPDATE + id, false, token);
//POST
const register = (data) => Post(process.env.REACT_APP_API_REGISTER, false, data);
const login = (data) => Post(process.env.REACT_APP_API_LOGIN, false, data);
const topup = (data, token) => Post(process.env.REACT_APP_API_TOPUP, false, data, token);
const order = (data, token) => Post(process.env.REACT_APP_API_ORDER, false, data,token);
const orderagent = (data, token) => Post(process.env.REACT_APP_API_ORDER_AGENT, false, data,token);
const transfer = (data, token) => Post(process.env.REACT_APP_API_TRANSFER, false, data,token);
const withdraw = (data, token) => Post(process.env.REACT_APP_API_WITHDRAW, false, data, token);
const updateProfile = (data, token) => Post(process.env.REACT_APP_API_UPDATE_PROFILE, false, data,token);
const activasi = (data, token) => Post(process.env.REACT_APP_API_ACTIVE, false, data, token);
const registerdownline = (data , token) => Post(process.env.REACT_APP_API_REGISTER_DOWNLINE, false,data,token);
const memberlist = (data, token) => Post(process.env.REACT_APP_API_MEMBER_NEW, false,data,token);


// PUT

const API = {
      register,
      login,
      products,
      point,
      productDetail,
      accountCash,
      topup,
      agents,
      members,
      order,
      agentShow,
      transfer,
      withdraw,
      updateProfile,
      paketMembers,
      activasi,
      historypoint,
      historyorder,
      historyordercancel,
      historyorderupdate,
      registerdownline, 
      downline,
      memberlist,
      stok,
      historyin,
      deliveryproses,
      deliveryupdate,
      orderagent,
}

export default API;