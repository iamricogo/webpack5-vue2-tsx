// import { AppModule } from '@/store/modules/app'
import { AppModule } from '@/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import resources from '@/resources'
import style from '@/views/home/style.module.scss'
import styleAbout from './style.module.scss'
@Component({
  name: 'AboutUs'
})
export default class extends Vue {
  private swiperOption: import('swiper').SwiperOptions = {
    slidesPerView: 1
  }
  render(): VNode {
    return (
      <div>
        <section class={[style.carousel, style.firstimg]}>
          <swiper ref="mySwiper" options={this.swiperOption}>
            {([resources[AppModule.language].about_us1] as string[]).map(
              (banner: string) => {
                return (
                  <swiper-slide>
                    <img src={banner} />
                  </swiper-slide>
                )
              }
            )}
          </swiper>
        </section>
        <section class={[style.about_us_entry]}>
          <div>
            <img src={resources[AppModule.language].about_us} alt="" />
          </div>

          <div>
            <section class={[style.text_box]}>
              <div class={[style.title]}>{this.$t(`about_us.background`)}</div>
              <div class={[style.content]}>{this.$t(`about_us.text1`)}</div>
            </section>
            <section class={[style.text_box]}>
              <div class={[style.title]}>{this.$t(`about_us.vision`)}</div>
              <div class={[style.content]}>{this.$t(`about_us.text2`)}</div>
            </section>
            <section class={[style.text_box]}>
              <div class={[style.title]}>{this.$t(`about_us.mission`)}</div>
              <div class={[style.content]}>{this.$t(`about_us.text3`)}</div>
            </section>
          </div>
        </section>
        <section class={[style.carousel, styleAbout.footerBanner]}>
          <swiper ref="mySwiper" options={this.swiperOption}>
            {([resources[AppModule.language].about_us2] as string[]).map(
              (banner: string) => {
                return (
                  <swiper-slide>
                    <img src={banner} />
                  </swiper-slide>
                )
              }
            )}
          </swiper>
        </section>
      </div>
    )
  }
}
