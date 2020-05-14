//index.js
//获取应用实例
const app = getApp()
var rawlist = wx.getStorageSync('cashflow') || []

Page({
  data: {
    userInfo: {},
    showModal1: false,
    showModal2: false,
    list: rawlist,
    temptitle: '',
    tempindex: ''
  },
  onLoad: function () {
    wx.removeStorageSync('typelist');
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
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
  showModalnew1: function(e){
    this.setData({
      showModal1: !this.data.showModal1
    })
  },
  modalConfirm1: function(e){
    var templist = this.data.list
    templist.push({
      title: this.data.temptitle,
      id: templist.length,
      items: []
    })
    rawlist.push({
      title: this.data.temptitle,
      id: templist.length,
      items: []
    })
    this.setData({
      showModal1: !this.data.showModal1,
      temltitle: '',
      list: templist
    })
    wx.setStorageSync('cashflow', rawlist)
  },
  modalCancel1(){
    this.setData({
      showModal1: !this.data.showModal1
    })
  },

  // 重命名模态框
  showModalre2: function (e) {
    var tempindex = e.currentTarget.dataset.index
    var temptitle = this.data.list[tempindex].title
    this.setData({
      showModal2: !this.data.showModal2,
      temptitle:temptitle,
      tempindex: tempindex
    })
  },
  modalConfirm2: function (e) {
    var templist = this.data.list
    var index = this.data.tempindex
    templist[index].title = this.data.temptitle
    rawlist[index].title = this.data.temptitle
    this.setData({
      showModal2: !this.data.showModal2,
      temptitle: '',
      list: templist
    })
    wx.setStorageSync('cashflow', rawlist)
  },
  modalCancel2: function () {
    this.setData({
      showModal2: !this.data.showModal2,
    })
  },

  // 删除账目
  del: function(e){
    var index = e.currentTarget.dataset.index
    this.data.list.splice(index,1)
    
    this.setData({
      list: this.data.list
    })
    rawlist.splice(index, 1)
    // wx.removeStorage({
    //   key: 'cashflow',
    //   success (res) {
    //     console.log(res)
    //   }
    // })
    wx.setStorageSync('cashflow', rawlist)
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    })
  }
})
