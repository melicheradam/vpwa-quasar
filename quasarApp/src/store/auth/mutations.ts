import { UserModel } from 'src/components/models'
import { MutationTree } from 'vuex'
import { AuthError, AuthStateInterface } from './state'

const mutation: MutationTree<AuthStateInterface> = {
  AUTH_START (state) {
    state.status = 'pending'
    state.errors = []
  },
  AUTH_SUCCESS (state, user: UserModel | null) {
    state.status = 'success'
    state.user = user
  },
  AUTH_ERROR (state, errors: AuthError[]) {
    state.status = 'error'
    state.errors = errors
  }
}

export default mutation