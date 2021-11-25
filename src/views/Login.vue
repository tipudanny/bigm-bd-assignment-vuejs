<template>
    <section class="login-section">
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="text-center mb-5">
                    <h1> Registration Form</h1>
                </div>
                <div class="col-md-8">
                    <form>
                        <div class="row mb-3">
                            <label class="col-sm-2 col-md-4 col-form-label">Email Address</label>
                            <div class="col-sm-10  col-md-8">
                                <el-input type="text" placeholder="Please input" v-model="fields.email"></el-input>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="col-sm-2 col-md-4 col-form-label">Password</label>
                            <div class="col-sm-10  col-md-8">
                                <el-input type="password" placeholder="Please input"
                                          v-model="fields.password"></el-input>
                            </div>
                        </div>

                        <button @click="loginOrRegister" class="btn btn-primary" :disabled="btnDisabled">
                                <span v-if="btnDisabled" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

import {Input, Autocomplete} from 'element-ui'

export default {
    name: 'Login',
    components: {
        ElInput: Input,
        ElAutocomplete: Autocomplete,
    },
    data() {
        return {
            btnDisabled: false,
            fields: {
                email: "",
                password: "",
            },
        }
    },
    mounted() {

    },
    methods: {
        loginOrRegister() {
            this.btnDisabled = true;
            this.$store.dispatch("login", {vm: this, fields: this.fields})
                .then(response => {
                    this.$router.push('/admin')
                })
                .catch(errors => {
                    console.log('error')
                })
                .finally(() => {
                    this.btnDisabled = false;
                })
        }
    }
}
</script>
