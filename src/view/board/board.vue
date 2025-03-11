<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {sendMsg, getList} from "../../api/board/board.js";

const mask = ref();
const bottom = ref();
const content = ref();
const timeInter = ref()
onMounted(() => {
  mask.value = document.querySelector('.mask');
  bottom.value = document.querySelector('.bottom');
  content.value = document.querySelector('.content');
});

const getRandomColor = () => {
  let rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
  if (rand.length == 6) {
    return rand;
  } else {
    return getRandomColor();
  }
}
const list = [
  "人生自古谁无死，留取丹心照汗青。",
  "窗含西岭千秋雪，门泊东吴万里船。",
  "举头望明月，低头思故乡。",
  "山重水复疑无路，柳暗花明又一村。",
  "白日依山尽，黄河入海流。",
  "此情可待成追忆，只是当时已惘然。",
  "落红不是无情物，化作春泥更护花。",
  "江山如此多娇，引无数英雄竞折腰。",
  "野火烧不尽，春风吹又生。",
  "大江东去，浪淘尽，千古风流人物。",
  "知我者，谓我心忧，不知我者，谓我何求。",
  "山外青山楼外楼，西湖歌舞几时休。",
  "一片花飞减却春，风飘万点正愁人。",
  "纸上得来终觉浅，绝知此事要躬行。",
  "有美一人，清扬婉兮。",
  "青山遮不住，毕竟东流去。",
  "梧桐更兼细雨，到黄昏，点点滴滴。",
  "白日依山尽，黄河入海流。",
  "此情可待成追忆，只是当时已惘然。",
  "落红不是无情物，化作春泥更护花。",
  "江山如此多娇，引无数英雄竞折腰。",
  "野火烧不尽，春风吹又生。",
  "大江东去，浪淘尽，千古风流人物。",
  "知我者，谓我心忧，不知我者，谓我何求。",
  "山外青山楼外楼，西湖歌舞几时休。",
  "一片花飞减却春，风飘万点正愁人。",
  "纸上得来终觉浅，绝知此事要躬行。",
  "有美一人，清扬婉兮。",
  "青山遮不住，毕竟东流去。",
  "梧桐更兼细雨，到黄昏，点点滴滴。",
  "人生自古谁无死，留取丹心照汗青。",
  "窗含西岭千秋雪，门泊东吴万里船。",
  "举头望明月，低头思故乡。",
  "山重水复疑无路，柳暗花明又一村。",
  "天阶夜色凉如水，卧看牵牛织女星。",
  "洞门高阁如春色，楼上风来细细。",
  "岳阳楼上君应有，楼高不见君来处。",
  "暖风熏得游人醉，直把杨花作灿烂。",
  "青枫江上秋更好，瑞鹤飞来双白鹇。",
  "春心莫共花争发，一寸相思一寸灰。",
  "东篱把酒黄昏后，有暗香盈袖。",
  "人生如梦，一尊还酹江月。",
  "落日渔舟唱晚，风吹芦花满渡头。",
  "欲寻芳草去，来数桥。",
  "春风又绿江南岸，明月何时照我还。",
  "宝瑟无端五十弦，一弦一柱思华年。"
]
// show()
const sent = ()=>{
  //获取内容可以顺带做个判断是否为空
  if (!content.value.value) return alert('请输入弹幕内容，亲')
  list.push(content.value.value)
  _sent()
  content.value.value = ''
}

const _sent = async () => {
  await sendMsg({
    content: content.value.value,
  })
}

const _getList = async () => {
  await getList().then(res => {
    for ( let i = 0; i < res.data.list.length; i ++ ) {
      list.push(res.data.list[i].content)
    }
  })
}

const show = (text) => {
  const div = document.createElement('div')
  div.style.color = "#" + getRandomColor()
  mask.value.append(div)
  div.innerHTML = text
  div.classList.add('TanText')
  const random = Math.abs(Math.random() * (window.innerHeight) * Math.random())
  div.style.top = random + 'px'
  div.style.userSelect = 'none'
  div.style.fontSize = 20 + Math.random() * 20 * Math.random() + "px"
  // div.style.transition = 'all 6s linear'
  div.style.transition = `all ${Math.random() * 2 + 5}s linear`
  div.style.transform = `translateX(-${mask.value.offsetWidth}px)`
}

onMounted(() => {
  let i = 0
  timeInter.value = setInterval(function () {
    show(list[i])
    i ++;
    if ( i >= list.length ) {
      i = 0;
    }
  }, 200)
  _getList()
})

onUnmounted(() => {
  for ( let i = 0; i <= timeInter.value; i ++ ) {
    clearInterval(i)
  }
})

</script>

<template>
  <div class="mask">

  </div>
  <!--底部发言框-->
  <div class="bottom">
    <input class="content">
    <a href="#" rel="external nofollow" @click="sent" class="send">发表言论</a>
  </div>
</template>

<style scoped>

.bottom {
  width: 100%;
  height: 77px;
  background: linear-gradient(#ccc,#4a4a4a);
  position: fixed;
  bottom: 0px;
  left: 0px;
  text-align: center;
  line-height: 77px;
}
.content {
  width: 50%;
  min-width: 200px;
  height: 37px;
  border: none;
  border-radius: 10px 0px 0px 10px;
  font-size: 16px;
  padding: 0 10px;
  outline: none;
}
.send {
  background-color: green;
  color: #fff;
  display: inline-block;
  width: 100px;
  height: 38px;
  line-height: 37px;
  text-align: center;
  position: relative;

  top: 2px;
  border-radius: 0px 10px 10px 0px;
  text-decoration: none;
  font-family: "Microsoft YaHei";
}
</style>