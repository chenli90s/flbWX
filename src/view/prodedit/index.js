import React from 'react';
import {
    WingBlank, Button,
    NavBar, WhiteSpace, Icon, List, InputItem, Picker, Toast, ImagePicker
} from 'antd-mobile';
import config from '../../utils/config'

class ProdEdit extends React.Component {

    constructor(props) {
        super(props);
        const data = props.location.state;
        // const {url, need_int, id, goods_name, jia} = props.location.state;
        console.log(data);
        let state = data || {url: '', need_int: '', id: '', goods_name: '', jia: ''};
        this.state = {
            ...state,
            file: data?[{url: data.url, id: data.id}]:[]
        }
    }


    submit = async () => {
        let params = {
            ...this.state
        };
        if(!params.file[0]){
            Toast.fail('请选择图片');
            return
        }
        if(params.file[0].file){
            let file = params.file[0].file;
            params.file = {type: file.name.split('.')[1], data: params.file[0].url.split(',')[1]}
        }else{
            delete params.file
        }

        await config.http.post('/add_goods', params);
        this.props.history.push('/static/user/mgprod');
    };



    onChange = (files, type, index)=>{
        console.log(files, type, index);
        if(type=='remove'){
            this.setState({file: []});
            return
        }
        this.setState({file: files.length>1? [files[1]]: [files[0]]})
    };

    componentDidMount = async () => {
    };

    render() {
        return (
            <div className="join">
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.push('/static/user/mgprod')
                    }}
                >加入我们</NavBar>
                <List>
                    <InputItem placeholder={'请输入名称'} type={'text'} value={this.state.goods_name}
                               onChange={(e) => {
                                   // console.log(e)
                                   this.setState({goods_name: e})
                               }}
                    >
                        名称
                    </InputItem>
                    <InputItem placeholder={'请输入价格'} type={'number'} value={this.state.jia}
                               onChange={(e) => {
                                   console.log(e);
                                   this.setState({jia: e})
                               }}
                    >
                        价格
                    </InputItem>
                    <InputItem placeholder={'请输入需要的积分'} type={'number'} value={this.state.need_int}
                               onChange={(e) => {
                                   console.log(e);
                                   this.setState({need_int: e})
                               }}
                    >
                        积分
                    </InputItem>
                    <ImagePicker
                        files={this.state.file}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={true}
                        multiple={false}
                        updatePlaceholder={'添加上传文件'}
                    />
                </List>
                {/*<div style={{textAlign: 'center', backgroundColor: '#fff'}}>*/}
                    {/*<img src={this.state.url} alt=""*/}
                         {/*onClick={()=>{config.wx.wx.previewImage({current: this.state.url, urls:[]})}}*/}
                         {/*style={{height: 170, width: 170}}/>*/}
                    {/*<Button type={'primary'} inline size={'small'}>上传图片</Button>*/}
                {/*</div>*/}
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <Button type={'primary'} onClick={this.submit}>提交</Button>
                </WingBlank>
            </div>
        )
    }
}

export default ProdEdit