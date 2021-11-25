<template>
    <section class="login-section">
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="text-center mb-5">
                    <h1> Registration Form</h1>
                </div>
                <div class="col-md-8">
                    <el-form
                        :model="fields"
                        :rules="rules"
                        ref="submitForm"
                        class="demo-ruleForm"
                        enctype="multipart/form-data"
                    >
                        <div class="row mb-3">
                            <el-form-item label="Applicant's Name" prop="name">
                                <el-input placeholder="Applicant's Name" v-model="fields.name"></el-input>
                            </el-form-item>
                        </div>
                        <div class="row mb-3">
                            <el-form-item label="Email Address" prop="email">
                                <el-input type="email" placeholder="Your Email Address"
                                          v-model="fields.email"></el-input>
                            </el-form-item>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-4  col-md-4">
                                <el-form-item label="Division" prop="division">
                                    <el-autocomplete
                                        v-model="fields.division"
                                        :fetch-suggestions="divisionSearchAsync"
                                        placeholder="Division"
                                        @select="filteredDivision"
                                        clearable
                                    ></el-autocomplete>
                                </el-form-item>
                            </div>
                            <div class="col-sm-4  col-md-4">
                                <el-form-item label="District" prop="district">
                                    <el-autocomplete
                                        v-model="fields.district"
                                        :fetch-suggestions="districtSearchAsync"
                                        placeholder="District"
                                        @select="filteredDistrict"
                                        clearable
                                    ></el-autocomplete>
                                </el-form-item>
                            </div>
                            <div class="col-sm-4  col-md-4">
                                <el-form-item label="Upazila" prop="upazila">
                                    <el-autocomplete
                                        v-model="fields.upazila"
                                        :fetch-suggestions="upazilaSearchAsync"
                                        placeholder="Upazila"
                                        @select="filteredUpazila"
                                        clearable
                                    ></el-autocomplete>
                                </el-form-item>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <el-form-item label="Address Details" prop="address_line">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="Address details"
                                    v-model="fields.address_line">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="row mb-3 align-items-center">
                            <el-form-item label="Language Proficiency">
                                <el-checkbox-group v-model="language_proficiency">
                                    <el-checkbox label="Bangla" name="language_proficiency"></el-checkbox>
                                    <el-checkbox label="English" name="language_proficiency"></el-checkbox>
                                    <el-checkbox label="French" name="language_proficiency"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                        <div class="row mb-3">
                            <label class="col-sm-2 col-md-4 col-form-label">Education Qualification</label>
                        </div>
                        <div
                            v-for=" (edu,index) in educations"
                            :key="index"
                            class="row mb-3 justify-content-between"
                        >
                            <div class="col-md-2">
                                <el-select v-model="edu.exam" placeholder="Exam">
                                    <el-option label="SSC" value="SSC"></el-option>
                                    <el-option label="HSC" value="HSC"></el-option>
                                    <el-option label="BSc" value="BSc"></el-option>
                                    <el-option label="MSc" value="MSc"></el-option>
                                </el-select>
                            </div>
                            <div class="col-md-3">
                                <el-select v-model="edu.university" placeholder="University">
                                    <el-option label="National University" value="National University"></el-option>
                                    <el-option label="Dhaka University" value="Dhaka University"></el-option>
                                    <el-option label="Khulna University" value="Khulna University"></el-option>
                                    <el-option label="Rajshahi University" value="Rajshahi University"></el-option>
                                </el-select>
                            </div>
                            <div class="col-md-3">
                                <el-select v-model="edu.board" placeholder="Board">
                                    <el-option label="Jessore" value="Jessore"></el-option>
                                    <el-option label="Khulna" value="Khulna"></el-option>
                                    <el-option label="Sylhet" value="Sylhet"></el-option>
                                    <el-option label="Barishal" value="Barishal"></el-option>
                                    <el-option label="Dhaka" value="Dhaka"></el-option>
                                    <el-option label="Rajshahi" value="Rajshahi"></el-option>
                                    <el-option label="Comilla" value="Comilla"></el-option>
                                    <el-option label="Dinajpur" value="Dinajpur"></el-option>
                                </el-select>
                            </div>
                            <div class="col-md-2">
                                <el-input placeholder="Result" v-model="edu.result"></el-input>
                            </div>
                            <div class="col-md-2 text-end d-flex justify-content-end align-items-center">
                                <i @click="appendNewEducation(index)" class="el-icon-plus border p-2 me-2"
                                   style="cursor: pointer"></i>
                                <i v-if="index > 0" @click="deleteNewEducation(index)" class="el-icon-delete border p-2"
                                   style="cursor: pointer"></i>
                            </div>
                        </div>
                        <div class="row mb-3 mt-5 align-items-center">
                            <label class="col-sm-2 col-md-4 col-form-label">Photo</label>
                            <div class="col-sm-10  col-md-8">
                                <div class="row align-items-center">
                                    <div class="col-md-6">
                                        <input
                                            type="file" ref="imageInput"
                                            class="form-control shadow-none"
                                            v-on:change="onImageChange"
                                        >
                                    </div>
                                    <div class="col-md-6">
                                        <img class="mb-3" v-if="isValidImage" :src="image" alt="" height="100px"
                                             width="100px">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3 mt-4 align-items-center">
                            <label class="col-sm-2 col-md-4 col-form-label">Attach your CV</label>
                            <div class="col-sm-10  col-md-8">
                                <div class="row">
                                    <div class="col-md-6">
                                        <input
                                            type="file" ref="fileInput"
                                            class="form-control shadow-none"
                                            v-on:change="onFileChange"
                                        >
                                    </div>
                                    <div v-if="isValidFile" class="col-md-6">
                                        <i class="el-icon-document p-2 border"> Document Attached</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3 align-items-center">
                            <label class="col-sm-2 col-md-4 col-form-label">Training</label>
                            <div class="col-sm-10  col-md-8">
                                <el-radio-group v-model="training">
                                    <el-radio label="true">Yes</el-radio>
                                    <el-radio label="false">No</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div v-if="training === 'true'"
                             v-for=" (train,index) in trainings"
                             :key="'A'+index"
                             class="row mb-3 justify-content-between"
                        >
                            <div class="col-md-5">
                                <el-input placeholder="Name" v-model="train.name"></el-input>
                            </div>
                            <div class="col-md-5">
                                <el-input placeholder="Details" v-model="train.details"></el-input>
                            </div>
                            <div class="col-md-2 text-end d-flex justify-content-end align-items-center">
                                <i @click="appendNewTraining(index)" class="el-icon-plus border p-2 me-2"
                                   style="cursor: pointer"></i>
                                <i v-if="index > 0" @click="deleteNewTraining(index)" class="el-icon-delete border p-2"
                                   style="cursor: pointer"></i>
                            </div>
                        </div>
                        <br>
                        <br>
                        <button @click.prevent="registration('submitForm')" class="btn btn-primary">Submit</button>
                    </el-form>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

import {
    Form, Input, Autocomplete, Radio, RadioGroup,
    FormItem,
    CheckboxGroup, Checkbox, Select, Option
} from 'element-ui'
import Api from "../api/Api";

export default {
    name: 'Login',
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElAutocomplete: Autocomplete,
        ElRadio: Radio,
        ElRadioGroup: RadioGroup,
        ElCheckboxGroup: CheckboxGroup,
        ElCheckbox: Checkbox,
        ElSelect: Select,
        ElOption: Option,
    },
    data() {
        return {
            btnDisabled: false,
            timeout: null,
            image: '',
            isValidImage: false,
            isValidFile: false,
            isValidEducation: false,
            training: 'false',
            educations: [
                {id: 1, exam: '', university: '', board: '', result: '',}
            ],
            trainings: [],
            language_proficiency: [],
            fields: {
                name: '',
                email: '',
                division: '',
                district: '',
                upazila: '',
                address_line: '',
                language_proficiency: '',
                educations: '',
                profile_image: '',
                cv_attachment: '',
                trainings: '',
            },
            division: [
                {"value": "vue"},
                {"value": "element"},
                {"value": "cooking"},
                {"value": "mint-ui"},
                {"value": "vuex"},
                {"value": "vue-router"},
                {"value": "babel"}
            ],
            district: [
                {"value": "vue"},
                {"value": "element"},
                {"value": "cooking"},
                {"value": "mint-ui"},
                {"value": "vuex"},
                {"value": "vue-router"},
                {"value": "babel"}
            ],
            upazila: [
                {"value": "vue"},
                {"value": "element"},
                {"value": "cooking"},
                {"value": "mint-ui"},
                {"value": "vuex"},
                {"value": "vue-router"},
                {"value": "babel"}
            ],
            rules: {
                name: [
                    {required: true, message: 'Please input Your name', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: 'Please input Email', trigger: 'blur'}
                ],
                division: [
                    {required: true, message: 'Please input Division', trigger: 'change'}
                ],
                district: [
                    {required: true, message: 'Please input District', trigger: 'change'}
                ],
                upazila: [
                    {required: true, message: 'Please input Upazila', trigger: 'change'}
                ],
                address_line: [
                    {required: true, message: 'Please input Address Details', trigger: 'blur'}
                ],
            }
        }
    },
    mounted() {

    },
    methods: {
        checkEducation(){
            this.educations.forEach((item,index)=>{
                this.isValidEducation = !(!item['exam'] || !item['university'] || !item['board'] || !item['result']);
            })
        },
        registration(submitForm) {
            this.checkEducation();
            this.$refs[submitForm].validate((valid) => {
                if (this.language_proficiency.length <= 0){
                    this.$notify.error({
                        title: 'Error',
                        message: 'Please Select at least one Language',
                    });
                    return false;
                }
                else if (!this.isValidEducation){
                    this.$notify.error({
                        title: 'Error',
                        message: 'Education Fields Required.',
                    });
                    return false;
                }

                else if (valid && this.isValidEducation && this.language_proficiency.length > 0) {
                    this.callToRegistration();
                } else {
                    this.$notify.error({
                        title: 'Error',
                        message: 'Please Fill required field accurately.',
                    });
                    return false;
                }
            });
        },
        callToRegistration() {
            this.btnDisabled = true;
            this.fields.educations = JSON.stringify(this.educations)
            this.fields.trainings = JSON.stringify(this.trainings)
            this.fields.language_proficiency = JSON.stringify(this.language_proficiency);

            const formData = new FormData();
            Object.entries(this.fields).forEach(([key, value]) => {
                formData.append(key, value);
            });

            Api.post('/registration', formData)
                .then(response => {
                    this.$notify.success({
                        title: 'Success',
                        message: 'You are successfully registered.',
                    });
                    this.$router.push('/')
                })
                .catch(errors => {
                    if (errors.response.data.cv_attachment){
                        this.$notify.error({
                            title: 'Error',
                            message: 'CV Attachment Field Required',
                        });
                    }
                    else if (errors.response.data.profile_image){
                        this.$notify.error({
                            title: 'Error',
                            message: 'Profile Image Field Required',
                        });
                    }
                    else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Fill Up All Required Field .',
                        });
                    }
                })
                .finally(() => {
                    this.btnDisabled = false;
                })
        },
        divisionSearchAsync(queryString, callback) {
            let results = queryString ? this.division.filter(this.createFilter(queryString)) : this.division;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                callback(results);
            }, 700);
        },
        districtSearchAsync(queryString, callback) {
            let results = queryString ? this.district.filter(this.createFilter(queryString)) : this.district;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                callback(results);
            }, 700);
        },
        upazilaSearchAsync(queryString, callback) {
            let results = queryString ? this.upazila.filter(this.createFilter(queryString)) : this.upazila;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                callback(results);
            }, 700);
        },
        createFilter(queryString) {
            return (item) => {
                return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        filteredDivision(item) {
            console.log(item);
        },
        filteredDistrict(item) {
            console.log(item);
        },
        filteredUpazila(item) {
            console.log(item);
        },
        appendNewEducation(id) {
            this.educations.push(
                {id: id + 2, exam: '', university: '', board: '', result: '',}
            )
        },
        deleteNewEducation(id) {
            this.educations.splice(id, 1);
        },
        appendNewTraining(id) {
            this.trainings.push(
                {id: id + 2, name: '', details: '',}
            )
        },
        deleteNewTraining(id) {
            this.trainings.splice(id, 1);
        },
        onImageChange(e) {
            //console.log(e.target.files[0]['type'])
            if (e.target.files[0]['type'] === 'image/jpeg' ||
                e.target.files[0]['type'] === 'image/png' ||
                e.target.files[0]['type'] === 'image/svg+xml' ||
                e.target.files[0]['type'] === 'image/webp' ||
                e.target.files[0]['type'] === 'image/gif') {
                this.fields.profile_image = e.target.files[0];
                let image = e.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e => {
                    this.image = e.target.result;
                }
                this.isValidImage = true;
                console.log(this.fields.profile_image)
            } else {
                console.log('not image');
                this.$notify.error({
                    title: 'Error',
                    message: 'This is Not Valid Image Type',
                });
                this.image = '';
                this.$refs.imageInput.value = null;
            }
        },
        onFileChange(e) {
            if (e.target.files[0]['type'] === 'application/doc' ||
                e.target.files[0]['type'] === 'application/ms-doc' ||
                e.target.files[0]['type'] === 'application/pdf' ||
                e.target.files[0]['type'] === 'application/msword' ||
                e.target.files[0]['type'] === 'application/vnd.ms-excel' ||
                e.target.files[0]['type'] === 'application/vnd.ms-powerpoint' ||
                e.target.files[0]['type'] === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                e.target.files[0]['type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                e.target.files[0]['type'] === 'text/plain') {
                this.fields.cv_attachment = e.target.files[0];
                this.isValidFile = true
            } else {
                this.$notify.error({
                    title: 'Error',
                    message: 'This is Not Valid Document Type',
                });
                this.$refs.fileInput.value = null;
            }
        }
    },
    watch: {
        'training': {
            handler(value) {
                console.log(value)
                if (value === true || value === 'true') {
                    this.trainings.push({id: 1, name: '', details: ''})
                } else this.trainings = [];
            }
        }
    }
}
</script>
