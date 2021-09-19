import { AppModule } from '@/store/modules/app'
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import { Debounce } from '@/utils/Decorator'
import { ElForm } from '@/plugins/element-ui'
import { VNode } from 'vue/types/umd'
import ContactUsService, { SubmitData } from './service'
import Validator from '@/utils/Validator'
import resources from '@/resources'
import settings from '@/settings'
import style from '@/views/home/style.module.scss'
import styleContactUs from './style.module.scss'
@Component({
  name: 'ContactUs'
})
export default class extends Vue {
  private map!: google.maps.Map
  private loading = false
  @Ref() readonly elFormComponent!: ElForm
  private swiperOption: import('swiper').SwiperOptions = {
    slidesPerView: 1
  }
  private formData: SubmitData = {
    name: '',
    email: '',
    mobile_number: '',
    comment: ''
  }
  private get formList(): {
    key: string
    field: keyof SubmitData
    type?: 'textarea' | ''
    formItemData?: Record<string, unknown>
    inputData?: Record<string, unknown>
  }[] {
    const ruleFlag = {
      empty: `contact_us.form_rules.empty`,
      format: `contact_us.form_rules.format`,
      name: `common.name`,
      email: `common.email`,
      mobile_number: `common.mobile_number`,
      comment: `common.comment`,
      emptyMessage: (emptyFlag: string, nameFlag: string) =>
        (this.$t(emptyFlag) as string).replace(
          '{name}',
          (this.$t(nameFlag) as string).toLowerCase()
        ),
      formatMessage: (formatFlag: string, nameFlag: string) =>
        (this.$t(formatFlag) as string).replace(
          '{name}',
          (this.$t(nameFlag) as string).toLowerCase()
        )
    }

    return [
      {
        key: 'name',
        field: 'name',
        formItemData: {
          props: {
            rules: [
              {
                required: true,
                trigger: ['change', 'blur'],
                message: ruleFlag.emptyMessage(ruleFlag.empty, ruleFlag.name)
              }
            ]
          }
        }
      },
      {
        key: 'email',
        field: 'email',
        formItemData: {
          props: {
            rules: [
              {
                required: true,
                trigger: ['change', 'blur'],
                validator: (
                  rule: unknown,
                  value: string,
                  callback: (err?: string) => void
                ) => {
                  if (Validator.isEmpty(value))
                    return callback(
                      ruleFlag.emptyMessage(ruleFlag.empty, ruleFlag.email)
                    )

                  if (!Validator.isEmail(value)) {
                    return callback(
                      ruleFlag.formatMessage(ruleFlag.format, ruleFlag.email)
                    )
                  }
                  callback()
                }
              }
            ]
          }
        }
      },
      {
        key: 'mobile_number',
        field: 'mobile_number',
        formItemData: {
          props: {
            rules: [
              {
                required: true,
                trigger: ['change', 'blur'],
                validator: (
                  rule: unknown,
                  value: string,
                  callback: (err?: string) => void
                ) => {
                  if (Validator.isEmpty(value))
                    return callback(
                      ruleFlag.emptyMessage(
                        ruleFlag.empty,
                        ruleFlag.mobile_number
                      )
                    )

                  if (!Validator.isMobileNumber(value)) {
                    return callback(
                      ruleFlag.formatMessage(
                        ruleFlag.format,
                        ruleFlag.mobile_number
                      )
                    )
                  }
                  callback()
                }
              }
            ]
          }
        }
      },
      {
        key: 'comment',
        field: 'comment',
        type: 'textarea',
        formItemData: {
          props: {
            rules: [
              {
                required: true,
                trigger: ['change', 'blur'],
                message: ruleFlag.emptyMessage(ruleFlag.empty, ruleFlag.comment)
              }
            ]
          }
        },
        inputData: {
          props: {
            autosize: { minRows: 4 }
          }
        }
      }
    ]
  }

  /**语言切换后有错误标识的表单需要重新调用验证函数纠正国际语言 */
  @Watch('$store.state.app.language')
  protected validateErrorField(): void {
    this.$nextTick(() => {
      this.elFormComponent?.fields?.forEach(({ prop, validateMessage }) => {
        if (!Validator.isEmpty(validateMessage)) {
          this.elFormComponent.validateField(prop)
        }
      })
    })
  }

  @Debounce(300)
  private async onSubmit(): Promise<void> {
    try {
      await this.elFormComponent.validate()
      this.loading = true
      console.log('submit - start')
      ContactUsService.submit(this.formData)
        .then(({ data: { data } }) => {
          console.log(data)
          console.log('submit - success')
        })
        .finally(() => {
          this.loading = false
        })
    } catch (error) {
      console.log(error)
    }
  }

  protected mounted(): void {
    this.initMap()
  }

  private initMap(): void {
    const point = { lat: 39.90237547889556, lng: 116.40966440138027 }

    this.map = new google.maps.Map(
      document.getElementById(styleContactUs['map-container']) as HTMLElement,
      {
        center: point,
        zoom: 15
      }
    )

    const marker = new google.maps.Marker({
      position: point,
      map: this.map,
      animation: google.maps.Animation.DROP
    })

    marker.addListener('click', () => {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null)
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE)
      }
    })
  }

  render(): VNode {
    return (
      <div class={[styleContactUs['contact-us-box']]}>
        <section class={[style.carousel, style.firstimg]}>
          <swiper ref="mySwiper" options={this.swiperOption}>
            {([resources[AppModule.language].contactus] as string[]).map(
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
        <section class={[styleContactUs['context-box']]}>
          <div class={[styleContactUs['form-text-box']]}>
            <div class={[styleContactUs['text-box']]}>
              <h3>{this.$t(`navbar.contact_us`)}</h3>
              <p>{this.$t(`contact_us.text1`)}</p>
            </div>
            <div class={[styleContactUs['form-box']]}>
              <el-form
                ref={'elFormComponent'}
                label-position="right"
                label-width="80px"
                {...{
                  props: {
                    model: this.formData
                  }
                }}
              >
                {this.formList.map(
                  ({ key, field, type, formItemData, inputData }) => (
                    <el-form-item
                      label-width="20px"
                      label-position="left"
                      label=" "
                      prop={field}
                      {...formItemData}
                    >
                      <el-input
                        placeholder={this.$t(`common.${key}`)}
                        type={type}
                        v-model={this.formData[field]}
                        {...inputData}
                      ></el-input>
                    </el-form-item>
                  )
                )}

                <el-form-item
                  label-width="20px"
                  label-position="left"
                  label=" "
                >
                  <div class={[styleContactUs['btn-box']]}>
                    <el-button loading={this.loading} onClick={this.onSubmit}>
                      {this.$t(`common.submit`)}
                    </el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class={[styleContactUs['map-box']]}>
            <div class={[styleContactUs['img-box']]}>
              <div id={styleContactUs['map-container']}></div>
              <img
                style={{ visibility: 'hidden' }}
                src={resources.common.maps}
                alt=""
              />
            </div>
            <div class={[styleContactUs['info-box']]}>
              <p>
                <span> {`${this.$t(`common.address`)}`}:</span>

                <b> {settings.address}</b>
              </p>

              <p>
                <span> Whatsapp:</span>

                <b> {settings.whatsapp}</b>
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
