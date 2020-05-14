// 获取应用实例
var app = getApp();
var list = wx.getStorageSync('typelist') || [];
var typearray = app.globalData.typearray

Page({
  data: {
    showModal1: false,
    temptitle: '',
    list: list
  },
  onLoad: function () {   // 监听页面加载
    if(list.length == 0){
      for(var i = 0;i< typearray.length;i++){
        list.push({
          id:1,
          name: typearray[i],
          edit: false
        })
      }
    }
    this.setData({
      list: list
    })
  },
  setTitle: function(e){
    this.setData({
      temptitle: e.detail.value
    })
    return {
      value: ''
    }
  },
  // 新建项目
  showModal: function(e){
    this.setData({
      showModal1: !this.data.showModal1
    })
  },
  modalConfirm1: function(e){
    var templist = this.data.list
    templist.push({
      name: this.data.temptitle,
      id: templist.length,
      items: []
    })
    this.setData({
      showModal1: !this.data.showModal1,
      temltitle: '',
      list: templist
    })
    wx.setStorageSync('typelist', templist)
  },
  modalCancel1(){
    this.setData({
      showModal1: !this.data.showModal1
    })
  },

  clearAll: function(){
    var that = this;
    wx.showModal({
      title: '警告',
      content: '请确认自建类别未在使用，且删除所有自建分类后无法找回！',
      success: function(res) {
        if(res.confirm){
          var list = [];
          for(var i = 0;i< typearray.length;i++){
            list.push({
              id:1,
              name: typearray[i],
              edit: false
            })
          }
          wx.setStorageSync('typelist',list)
          that.setData({
            list: list
          })
        }else if(res.cancel){
          // console.loog('用户点击取消);
        }
      }
    })
  }
})
