<template>
  
  <div ref="container" v-loading="loading" element-loading-text="视频加载中ing..." id="container">
    <div class="drawer-btn" @click="switchDrawer" ></div>
    <NPlayer
      :options="options"
      :set="setPlayer"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Player} from "nplayer"
  import { createIcon } from '@renderer/player';
  import { mitter } from '@renderer/player';
  import Hls,{ErrorTypes} from "hls.js";

  const hls = new Hls({
    capLevelToPlayerSize: true,
  });
  // 设置直播时间窗口，确保流缓冲足够的内容以防断线
  hls.config.fragLoadingMaxRetry = 6;
  hls.config.fragLoadingMaxRetryTimeout = 30000;

  let options = ref({src:''});
  let loading = ref(false);
  let container = ref();


  let player:Player;

  // 监听错误事件
  let playerErrorType:ErrorTypes;
  hls.on(Hls.Events.ERROR, function(_, data) {
    if (data.fatal) {
      switch(data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          // 网络错误处理

          if(data.type !== playerErrorType)
          {
            mitter.emit("event-alert-show",{
              title:"请求播放资源失败",
              func:()=>{}
            });
            console.warn(Hls.ErrorTypes.NETWORK_ERROR,"请求播放资源失败");
            playerErrorType = data.type;
          }
          mitter.emit("event-play-error");
          loading.value = false;
          player.pause();
          hls.startLoad();
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          // 媒体错误处理
          if(data.type !== playerErrorType)
          {
            console.warn(Hls.ErrorTypes.MEDIA_ERROR,"请求播放资源失败 -> ",data);
            mitter.emit("event-alert-show",{
              title:"播放资源不可用",
              func:()=>{}
            }); 
            player.pause();
            playerErrorType = data.type;
          }
          mitter.emit("event-play-error");
          loading.value = false;
          hls.recoverMediaError();
          break;
        default:
          // 其他错误处理

          if(data.type !== playerErrorType)
          {
            mitter.emit("event-alert-show",{
              title:"未知错误",
              func:()=>{}
            });  
            console.log('fatal error encountered, aborting');
            playerErrorType = data.type;
          }
          mitter.emit("event-play-error");
          loading.value = false;
          player.pause();
          hls.destroy();
          break;
      }
    }

  });

  function isM3u8(url:string){
    return /\.m3u8$/.test(url);
}

 

  mitter.on("event-video-play",(episode:any)=>{
    console.log("player -> ",episode);
    if(isM3u8(episode.url)){
      options.value.src = episode.url;
      hls.loadSource(episode.url);
      loading.value = true;
    }else{
      player.video.src = episode.url;
      player.play();
    }

  });

  mitter.on("event-player-clear",()=>{
    hls.stopLoad();
    player.pause();
  });
  function switchDrawer(){
    mitter.emit("event-drawer-switch")
  }
  
  function setPlayer(p:Player){
    player = p;

    hls.attachMedia(player.video);
    var dot = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="__lottie_element_25"><rect width="18" height="18" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_25)"><g transform="matrix(1,0,0,1,8.937000274658203,8.25)" opacity="0.14" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0.07500000298023224,1.2130000591278076)"><path fill="rgb(251,114,153)" fill-opacity="1" d=" M9,-3.5 C9,-3.5 9,3.5 9,3.5 C9,5.707600116729736 7.207600116729736,7.5 5,7.5 C5,7.5 -5,7.5 -5,7.5 C-7.207600116729736,7.5 -9,5.707600116729736 -9,3.5 C-9,3.5 -9,-3.5 -9,-3.5 C-9,-5.707600116729736 -7.207600116729736,-7.5 -5,-7.5 C-5,-7.5 5,-7.5 5,-7.5 C7.207600116729736,-7.5 9,-5.707600116729736 9,-3.5z"></path></g></g><g transform="matrix(1,0,0,1,9.140999794006348,8.67199993133545)" opacity="0.28" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,-0.1509999930858612,0.7990000247955322)"><path fill="rgb(251,114,153)" fill-opacity="1" d=" M8,-3 C8,-3 8,3 8,3 C8,4.931650161743164 6.431650161743164,6.5 4.5,6.5 C4.5,6.5 -4.5,6.5 -4.5,6.5 C-6.431650161743164,6.5 -8,4.931650161743164 -8,3 C-8,3 -8,-3 -8,-3 C-8,-4.931650161743164 -6.431650161743164,-6.5 -4.5,-6.5 C-4.5,-6.5 4.5,-6.5 4.5,-6.5 C6.431650161743164,-6.5 8,-4.931650161743164 8,-3z"></path></g></g><g transform="matrix(0.9883429408073425,-0.7275781631469727,0.6775955557823181,0.920446515083313,7.3224687576293945,-0.7606706619262695)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(0.9937776327133179,-0.11138220876455307,0.11138220876455307,0.9937776327133179,-2.5239999294281006,1.3849999904632568)"><path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.75,-1.25 C0.75,-1.25 0.75,1.25 0.75,1.25 C0.75,1.663925051689148 0.4139249920845032,2 0,2 C0,2 0,2 0,2 C-0.4139249920845032,2 -0.75,1.663925051689148 -0.75,1.25 C-0.75,1.25 -0.75,-1.25 -0.75,-1.25 C-0.75,-1.663925051689148 -0.4139249920845032,-2 0,-2 C0,-2 0,-2 0,-2 C0.4139249920845032,-2 0.75,-1.663925051689148 0.75,-1.25z"></path></g></g><g transform="matrix(1.1436611413955688,0.7535901665687561,-0.6317168474197388,0.9587040543556213,16.0070743560791,2.902894973754883)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(0.992861807346344,0.1192704513669014,-0.1192704513669014,0.992861807346344,-2.5239999294281006,1.3849999904632568)"><path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.75,-1.25 C0.75,-1.25 0.75,1.25 0.75,1.25 C0.75,1.663925051689148 0.4139249920845032,2 0,2 C0,2 0,2 0,2 C-0.4139249920845032,2 -0.75,1.663925051689148 -0.75,1.25 C-0.75,1.25 -0.75,-1.25 -0.75,-1.25 C-0.75,-1.663925051689148 -0.4139249920845032,-2 0,-2 C0,-2 0,-2 0,-2 C0.4139249920845032,-2 0.75,-1.663925051689148 0.75,-1.25z"></path></g></g><g transform="matrix(1,0,0,1,8.890999794006348,8.406000137329102)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0.09099999815225601,1.1009999513626099)"><path fill="rgb(255,255,255)" fill-opacity="1" d=" M7,-3 C7,-3 7,3 7,3 C7,4.379749774932861 5.879749774932861,5.5 4.5,5.5 C4.5,5.5 -4.5,5.5 -4.5,5.5 C-5.879749774932861,5.5 -7,4.379749774932861 -7,3 C-7,3 -7,-3 -7,-3 C-7,-4.379749774932861 -5.879749774932861,-5.5 -4.5,-5.5 C-4.5,-5.5 4.5,-5.5 4.5,-5.5 C5.879749774932861,-5.5 7,-4.379749774932861 7,-3z"></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(0,0,0)" stroke-opacity="1" stroke-width="1.5" d=" M7,-3 C7,-3 7,3 7,3 C7,4.379749774932861 5.879749774932861,5.5 4.5,5.5 C4.5,5.5 -4.5,5.5 -4.5,5.5 C-5.879749774932861,5.5 -7,4.379749774932861 -7,3 C-7,3 -7,-3 -7,-3 C-7,-4.379749774932861 -5.879749774932861,-5.5 -4.5,-5.5 C-4.5,-5.5 4.5,-5.5 4.5,-5.5 C5.879749774932861,-5.5 7,-4.379749774932861 7,-3z"></path></g></g><g transform="matrix(1,0,0,1,8.89900016784668,8.083999633789062)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,-2.5239999294281006,1.3849999904632568)"><path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.875,-1.125 C0.875,-1.125 0.875,1.125 0.875,1.125 C0.875,1.607912540435791 0.48291251063346863,2 0,2 C0,2 0,2 0,2 C-0.48291251063346863,2 -0.875,1.607912540435791 -0.875,1.125 C-0.875,1.125 -0.875,-1.125 -0.875,-1.125 C-0.875,-1.607912540435791 -0.48291251063346863,-2 0,-2 C0,-2 0,-2 0,-2 C0.48291251063346863,-2 0.875,-1.607912540435791 0.875,-1.125z"></path></g></g><g transform="matrix(1,0,0,1,14.008999824523926,8.083999633789062)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,-2.5239999294281006,1.3849999904632568)"><path fill="rgb(0,0,0)" fill-opacity="1" d=" M0.8999999761581421,-1.100000023841858 C0.8999999761581421,-1.100000023841858 0.8999999761581421,1.100000023841858 0.8999999761581421,1.100000023841858 C0.8999999761581421,1.596709966659546 0.4967099726200104,2 0,2 C0,2 0,2 0,2 C-0.4967099726200104,2 -0.8999999761581421,1.596709966659546 -0.8999999761581421,1.100000023841858 C-0.8999999761581421,1.100000023841858 -0.8999999761581421,-1.100000023841858 -0.8999999761581421,-1.100000023841858 C-0.8999999761581421,-1.596709966659546 -0.4967099726200104,-2 0,-2 C0,-2 0,-2 0,-2 C0.4967099726200104,-2 0.8999999761581421,-1.596709966659546 0.8999999761581421,-1.100000023841858z"></path></g></g></g></svg>`
    var playBig = `<svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="pid-53-svgo-a" d="M0 0h80v80H0z"></path><path d="M52.546 8.014a3.998 3.998 0 014.222 3.077c.104.446.093.808.039 1.138a2.74 2.74 0 01-.312.881c-.073.132-.16.254-.246.376l-.257.366-.521.73c-.7.969-1.415 1.926-2.154 2.866l-.015.02a240.945 240.945 0 015.986.341l1.643.123.822.066.41.034.206.018.103.008.115.012c1.266.116 2.516.45 3.677.975a11.663 11.663 0 013.166 2.114c.931.87 1.719 1.895 2.321 3.022a11.595 11.595 0 011.224 3.613c.03.157.046.316.068.474l.015.119.013.112.022.206.085.822.159 1.646c.1 1.098.19 2.198.27 3.298.315 4.4.463 8.829.36 13.255a166.489 166.489 0 01-.843 13.213c-.012.127-.034.297-.053.454a7.589 7.589 0 01-.072.475l-.04.237-.05.236a11.762 11.762 0 01-.74 2.287 11.755 11.755 0 01-5.118 5.57 11.705 11.705 0 01-3.623 1.263c-.158.024-.316.052-.475.072l-.477.053-.821.071-1.644.134c-1.096.086-2.192.16-3.288.23a260.08 260.08 0 01-6.578.325c-8.772.324-17.546.22-26.313-.302a242.458 242.458 0 01-3.287-.22l-1.643-.129-.822-.069-.41-.035-.206-.018c-.068-.006-.133-.01-.218-.02a11.566 11.566 0 01-3.7-.992 11.732 11.732 0 01-5.497-5.178 11.73 11.73 0 01-1.215-3.627c-.024-.158-.051-.316-.067-.475l-.026-.238-.013-.119-.01-.103-.07-.823-.132-1.648a190.637 190.637 0 01-.22-3.298c-.256-4.399-.358-8.817-.258-13.233.099-4.412.372-8.811.788-13.197a11.65 11.65 0 013.039-6.835 11.585 11.585 0 016.572-3.563c.157-.023.312-.051.47-.07l.47-.05.82-.07 1.643-.13a228.493 228.493 0 016.647-.405l-.041-.05a88.145 88.145 0 01-2.154-2.867l-.52-.73-.258-.366c-.086-.122-.173-.244-.246-.376a2.74 2.74 0 01-.312-.881 2.808 2.808 0 01.04-1.138 3.998 3.998 0 014.22-3.077 2.8 2.8 0 011.093.313c.294.155.538.347.742.568.102.11.19.23.28.35l.27.359.532.72a88.059 88.059 0 012.06 2.936 73.036 73.036 0 011.929 3.03c.187.313.373.628.556.945 2.724-.047 5.447-.056 8.17-.038.748.006 1.496.015 2.244.026.18-.313.364-.624.549-.934a73.281 73.281 0 011.93-3.03 88.737 88.737 0 012.059-2.935l.533-.72.268-.359c.09-.12.179-.24.281-.35a2.8 2.8 0 011.834-.881zM30.13 34.631a4 4 0 00-.418 1.42 91.157 91.157 0 00-.446 9.128c0 2.828.121 5.656.364 8.483l.11 1.212a4 4 0 005.858 3.143c2.82-1.498 5.55-3.033 8.193-4.606a177.41 177.41 0 005.896-3.666l1.434-.942a4 4 0 00.047-6.632 137.703 137.703 0 00-7.377-4.708 146.88 146.88 0 00-6.879-3.849l-1.4-.725a4 4 0 00-5.382 1.742z" id="pid-53-svgo-d"></path><filter x="-15.4%" y="-16.3%" width="130.9%" height="132.5%" filterUnits="objectBoundingBox" id="pid-53-svgo-c"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix><feOffset in="SourceAlpha" result="shadowOffsetOuter2"></feOffset><feGaussianBlur stdDeviation="3.5" in="shadowOffsetOuter2" result="shadowBlurOuter2"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" in="shadowBlurOuter2" result="shadowMatrixOuter2"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="shadowMatrixOuter2"></feMergeNode></feMerge></filter></defs><g fill="none" fill-rule="evenodd" opacity=".8"><mask id="pid-53-svgo-b" fill="#fff"><use xlink:href="#pid-53-svgo-a"></use></mask><g mask="url(#pid-53-svgo-b)"><use fill="#000" filter="url(#pid-53-svgo-c)" xlink:href="#pid-53-svgo-d"></use><use fill="#FFF" xlink:href="#pid-53-svgo-d"></use></g></g></svg>`

    player.on("Error",(...args)=>{
      console.log("error -> ",args);
    });

    player.video.addEventListener("loadeddata",()=>{
      
      loading.value = false;
      player.play();
      switchDrawer();
    });

    player.updateOptions({
      themeColor: 'rgba(35,173,229, 1)',
      progressBg: 'rgba(35,173,229, 1)',
      volumeProgressBg: 'rgba(35,173,229, 1)',
      progressDot: createIcon(dot, true)(),
      posterPlayEl: createIcon(playBig)(),
    });
  }


</script>

<style scoped>
    #container{
        height: 100%;
        position: relative;
        /* background-color: blue; */
        flex: 7;
    }

    .drawer-btn{
      width: 30px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.7);
      background-image: url('../../../../resources/expand.png');
      background-size: 100%;
      position:absolute;
      z-index: 100;
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 15px 0px 0px 15px;
      /* top: 10000000px; */
    }
</style>
