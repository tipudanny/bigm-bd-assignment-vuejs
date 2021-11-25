<template>
    <div>
        <div class="mt-5">
            <h4 class="text-center"><span class="border-bottom p-3">All User List</span></h4>
        </div>
        <div>
            <div class="row justify-content-center mt-5">
                <div class="col-md-8">
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#SL</th>
                            <th scope="col">Name</th>
                            <th scope="col">Emial</th>
                            <th scope="col">Division</th>
                            <th scope="col">District</th>
                            <th scope="col">Upazila/Thana</th>
                            <th scope="col">Create Date</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(user,index) in allUsers" :key="index">
                            <th>{{ (index + pagination.from)}}</th>
                            <td>{{ user.name}}</td>
                            <td>{{ user.email}}</td>
                            <td>{{ user.division}}</td>
                            <td>{{ user.district}}</td>
                            <td>{{ user.upazila}}</td>
                            <td>{{ user.created_at | dateWithMonth}}</td>
                            <td class="d-flex mt-3">
                                <i @click="deleteUser(user.id)" class="el-icon-delete me-3 p-2 border" style="cursor: pointer"></i>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <el-pagination
                        background
                        layout="prev,next"
                        :total=pagination.total
                        :current-page.sync=pagination.currentPage
                        :page-size=pagination.pageSize
                        @prev-click="getPrevPageData()"
                        @next-click="getNextPageData()"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from "../api/Api";
import {Pagination} from 'element-ui';

export default {
    name: "Admin",
    components:{
        ElPagination:Pagination,
    },
    data() {
        return {
            allUsers: [],
            pagination:{
                currentPage:1,
                prevPage:'',
                nextPage:'',
                pageSize:0,
                from:1,
            }
        }
    },
    mounted() {
        this.getAllUsers();
    },
    methods: {
        getAllUsers(page) {
            page = page ? page : 1;
            this.$Progress.start()
            Api.get(`/users?page=${page}`)
                .then(respose => {
                    this.allUsers = respose.data.data
                    this.pagination.currentPage = respose.data.meta.current_page;
                    this.pagination.pageSize = respose.data.meta.per_page;
                    this.pagination.from = respose.data.meta.from;
                    this.pagination.total = respose.data.meta.total;
                    this.pagination.nextPage = respose.data.links.next;
                    this.pagination.prevPage = respose.data.links.prev;
                })
                .catch(error => {
                    //error
                    this.$Progress.fail()
                })
                .finally(() => this.$Progress.finish())
        },
        getPrevPageData(){
            this.getAllUsers(this.pagination.currentPage - 1)
        },
        getNextPageData(){
            this.getAllUsers(this.pagination.currentPage + 1)
        },
        deleteUser(id){
            this.$Progress.start()
            Api.post(`/user/${id}`)
            .then(response=>{
                this.getAllUsers();
                this.$notify.success({
                    title: 'Success',
                    message: 'User Successfully Deleted',
                });
            })
            .catch(errors=>{
                this.$Progress.faile()
                this.$notify.error({
                    title: 'Error',
                    message: 'User Delete Failed !! Try Again.',
                });
            })
            .finally(()=> this.$Progress.finish())
        }
    }
}
</script>

<style scoped>

</style>