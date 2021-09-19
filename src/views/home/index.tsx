// import { AppModule } from '@/store/modules/app'
import { AppModule } from '@/store/modules/app'
import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import resources from '@/resources'
import style from './style.module.scss'
@Component({
  name: 'Home'
})
export default class extends Vue {
  private swiperOption: import('swiper').SwiperOptions = {
    slidesPerView: 1,
    autoplay: {
      delay: 6000
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }
  render(): VNode {
    return (
      <div>
        <section class={[style.carousel, style.firstimg]}>
          <swiper ref="mySwiper" options={this.swiperOption}>
            {(resources[AppModule.language].banners as string[]).map(
              (banner: string) => {
                return (
                  <swiper-slide>
                    <img src={banner} />
                  </swiper-slide>
                )
              }
            )}
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </section>
        <section class={[style.about_us_entry]}>
          <div>
            <img src={resources[AppModule.language].about_us} alt="" />
          </div>

          <div>
            <div class={[style.title]}>{this.$t(`navbar.about_us`)}</div>
            <div class={[style.content]}>{this.$t(`about_us.text1`)}</div>
            <div
              class={[style.footer]}
              onClick={() => {
                this.$router.push('/about_us')
              }}
            >
              {this.$t(`common.more_info`)}
            </div>
          </div>
        </section>
      </div>
    )
  }
}
