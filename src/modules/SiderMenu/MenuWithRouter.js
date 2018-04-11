import React, {Component} from 'react'
import './SiderMenu.scss'
import {Menu,Icon} from 'antd'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {withRouter,Link} from 'react-router-dom'

export default function MenuWithRouter(WrapComponent){
    return class Menu1 extends WrapComponent{
        constructor(props) {
            super(props)
            this.state = this.setDefaultSelectedKey(this.props)
        }

        componentDidMount(){
            console.log(this)
        }

        componentWillReceiveProps(nextProps){
            this.setState(this.setDefaultSelectedKey(nextProps))
        }

        setDefaultSelectedKey = (props) =>{
            const {
                location = {}
            } = props
            let pathname = location.pathname
            return {
                selectedKeys:[pathname]
            }
        }

        handleClick = (e) => {
            const {history} = this.props
            history.push(e.key)
        }

        render(){
            return <WrapComponent />
        }

    }
}
// class SiderMenu extends Component {
//     constructor(props){
//         super(props)
//         this.state = this.setDefaultSelectedKey(this.props)
//     }
//
//     componentWillReceiveProps(nextProps){
//         this.setState(this.setDefaultSelectedKey(nextProps))
//     }
//
//     setDefaultSelectedKey = (props) =>{
//         const {
//             location = {}
//         } = props
//         let pathname = location.pathname
//         return {
//             selectedKeys:[pathname]
//         }
//     }
//
//     handleClick = (e) => {
//         const {history} = this.props
//         history.push(e.key)
//     }
//     render() {
//         return (<div className="sider-wrap">
//             <Menu
//                 onClick={this.handleClick}
//                 style={{
//                     width: 256,
//                     minHeight:'100%'
//                 }}
//                 selectedKeys={this.state.selectedKeys}
//                 defaultOpenKeys={['sub1']}
//                 mode="inline">
//                 <Menu.Item key="/counter">counter</Menu.Item>
//                 <Menu.Item key="/async1">async1</Menu.Item>
//                 <SubMenu
//                     key="sub1"
//                     title={<span> page</span>}>
//                     <Menu.Item key="/page3">page3</Menu.Item>
//                     <Menu.Item key="/page4">page4</Menu.Item>
//                     <Menu.Item key="/page5">page5</Menu.Item>
//                     <Menu.Item key="/page6">page6</Menu.Item>
//                     <SubMenu
//                         key="sub3"
//                         title={<span> page6 child</span>}>
//                         <Menu.Item key="/page6/page6child">page6child</Menu.Item>
//                     </SubMenu>
//                 </SubMenu>
//                 <SubMenu
//                     key="sub2"
//                     title={<span> <Icon type = "mail" /><span > Navigation One</span></span>}>
//                     <MenuItemGroup key="g1" title="Item 1">
//                         <Menu.Item key="1">Option 1</Menu.Item>
//                         <Menu.Item key="2">Option 2</Menu.Item>
//                     </MenuItemGroup>
//                     <MenuItemGroup key="g2" title="Item 2">
//                         <Menu.Item key="3">Option 3</Menu.Item>
//                         <Menu.Item key="4">Option 4</Menu.Item>
//                     </MenuItemGroup>
//                 </SubMenu>
//
//             </Menu>
//         </div>)
//     }
// }
//
// export default withRouter(SiderMenu)
