#!/bin/bash


#最大并发数
Thread_num=3
#命名管道文件
Tmp_fifo=/tmp/$$.fifo

#创建命名管道文件
mkfifo $Tmp_fifo
#用文件句柄(随便给个6)打开管道文件
exec 6<> $Tmp_fifo
rm -f $Tmp_fifo

##控制并发数
for i in `seq $Thread_num`
do
        #向管道中放入最大并发数个行，供下面read读取
        echo >&6
done

##

for i in {1..10}
do
        #通过文件句柄读取行，当行取尽时，停止下一步（并发）
        read -u 6
        {
                echo $i
                sleep 3
        #一个并发执行后要想管道中在加入一个空行，供下次使用
        echo >&6
        }&
done
wait
echo "END"
echo -e "time-consuming: $SECONDS seconds" #显示脚本执行耗时

