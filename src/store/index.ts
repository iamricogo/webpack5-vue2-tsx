import { IAppState } from './modules/app'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
}

const vuexLocal = createPersistedState({
  reducer({ app: { navbar, language, size } }: IRootState): {
    app: Partial<IAppState>
  } {
    return {
      app: {
        navbar,
        language,
        size
      }
    }
  }
})
// Declare empty store first, dynamically register all modules later.
const store = new Vuex.Store<IRootState>({
  plugins: [vuexLocal]
})

export const getVuexStorage = (key = 'vuex'): IRootState => {
  const storage = localStorage.getItem(key)
  const vuex = storage ? JSON.parse(storage) : {}
  return vuex
}

export default store
