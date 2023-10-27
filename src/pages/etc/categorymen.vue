<template>
    <div>
        <HeaderComp :headerCase="'sub'" :pageName="'MEN'" />

        <div id="content">
            <div class="category-gender">
                <div class="cate-gen-banner">
                    <div class="cgb-text">
                        <p class="txt01">MEN</p>
                        <p class="txt02">Choose men's Golf Supplies</p>
                    </div>
                    <img class="for-pc" src="../../assets/images/etc/dep1_banner_01.png" alt="카테고리 배너">
                    <img class="for-m" src="../../assets/images/etc/m_dep1_banner_01.png" alt="카테고리 배너">
                </div>
                <div class="w-set">
                    <div class="cate-gen-list" v-if="this.categoryLoad">
                        <div class="cate-gen-box" v-for="(item, index) in this.golfCategoryArr" :key="index">
                            <router-link :to="`/gooduser/goodslist/list/${item.id}?gen=men`">
                                <div class="imgbox">
                                    <img src="../../assets/images/etc/dep1_cate_01.png" alt="카테고리 이미지" v-if="index == 0">
                                    <img src="../../assets/images/etc/dep1_cate_02.jpg" alt="카테고리 이미지" v-if="index == 1">
                                    <img src="../../assets/images/etc/dep1_cate_03.jpg" alt="카테고리 이미지" v-if="index == 2">
                                    <img src="../../assets/images/etc/dep1_cate_04.jpg" alt="카테고리 이미지" v-if="index == 3">
                                    <img src="../../assets/images/etc/dep1_cate_05.jpg" alt="카테고리 이미지" v-if="index == 4">
                                    <img src="../../assets/images/etc/dep1_cate_06.jpg" alt="카테고리 이미지" v-if="index == 5">
                                    <img src="../../assets/images/etc/dep1_cate_07.jpg" alt="카테고리 이미지" v-if="index == 6">
                                    <img src="../../assets/images/etc/dep1_cate_08.jpg" alt="카테고리 이미지" v-if="index == 7">
                                    <img src="../../assets/images/etc/dep1_cate_09.jpg" alt="카테고리 이미지" v-if="index == 8">
                                    <img src="../../assets/images/etc/dep1_cate_10.jpg" alt="카테고리 이미지" v-if="index == 9">
                                </div>
                                <div class="cgb-name">{{item.name}}</div>
                            </router-link>
                        </div>
                        <!-- <div class="cate-gen-box">
                            <router-link :to="{path:'/gooduser/goodslist/list/4', query:{gen:'men'}}">
                                <div class="imgbox"><img src="../../assets/images/etc/dep1_cate_02.png" alt="카테고리 이미지"></div>
                                <div class="cgb-name">의류</div>
                            </router-link>
                        </div>
                        <div class="cate-gen-box">
                            <router-link :to="{path:'/gooduser/goodslist/list/5', query:{gen:'men'}}">
                                <div class="imgbox"><img src="../../assets/images/etc/dep1_cate_03.png" alt="카테고리 이미지"></div>
                                <div class="cgb-name">가방</div>
                            </router-link>
                        </div>
                        <div class="cate-gen-box">
                            <router-link :to="{path:'/gooduser/goodslist/list/6', query:{gen:'men'}}">
                                <div class="imgbox"><img src="../../assets/images/etc/dep1_cate_04.png" alt="카테고리 이미지"></div>
                                <div class="cgb-name">골프화</div>
                            </router-link>
                        </div>
                        <div class="cate-gen-box">
                            <router-link :to="{path:'/gooduser/goodslist/list/7', query:{gen:'men'}}">
                                <div class="imgbox"><img src="../../assets/images/etc/dep1_cate_05.png" alt="카테고리 이미지"></div>
                                <div class="cgb-name">거리측정기</div>
                            </router-link>
                        </div>
                        <div class="cate-gen-box">
                            <router-link :to="{path:'/gooduser/goodslist/list/8', query:{gen:'men'}}">
                                <div class="imgbox"><img src="../../assets/images/etc/dep1_cate_01.png" alt="카테고리 이미지"></div>
                                <div class="cgb-name">골프공</div>
                            </router-link>
                        </div>
                        <div class="cate-gen-box">
                            <router-link :to="{path:'/gooduser/goodslist/list/9', query:{gen:'men'}}">
                                <div class="imgbox"><img src="../../assets/images/etc/dep1_cate_02.png" alt="카테고리 이미지"></div>
                                <div class="cgb-name">모자</div>
                            </router-link>
                        </div>
                        <div class="cate-gen-box">
                            <router-link :to="{path:'/gooduser/goodslist/list/10', query:{gen:'men'}}">
                                <div class="imgbox"><img src="../../assets/images/etc/dep1_cate_03.png" alt="카테고리 이미지"></div>
                                <div class="cgb-name">장갑</div>
                            </router-link>
                        </div>
                        <div class="cate-gen-box">
                            <router-link :to="{path:'/gooduser/goodslist/list/11', query:{gen:'men'}}">
                                <div class="imgbox"><img src="../../assets/images/etc/dep1_cate_04.png" alt="카테고리 이미지"></div>
                                <div class="cgb-name">필드용품</div>
                            </router-link>
                        </div>
                        <div class="cate-gen-box">
                            <router-link :to="{path:'/gooduser/goodslist/list/12', query:{gen:'men'}}">
                                <div class="imgbox"><img src="../../assets/images/etc/dep1_cate_05.png" alt="카테고리 이미지"></div>
                                <div class="cgb-name">기타 용품</div>
                            </router-link>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

        
        <MobileNavComp />
        <FooterComp />

    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
export default {
    name: "categoryMen",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
    },
    data: () => ({
        categoryLoad: false,
        golfCategoryArr: null,
    }),
    created () {
        this.categorySet();
    },
    methods: {
        categorySet() {
            let setCategory = () => {
                if (this.$store.state.categoryAll) {
                    clearInterval(waitCategory)
                    this.categoryLoad = true;
                    let tmpData1 = this.$store.state.categoryAll.filter(cd=>{
                        return cd.groups === 1 && cd.depth === 2
                    });
                    this.golfCategoryArr = tmpData1
                }
            };
            const waitCategory = setInterval(setCategory, 50);
        }
    },
    computed: {
        
    },
    mounted() {
    }
}

</script>
<style scoped>

</style>