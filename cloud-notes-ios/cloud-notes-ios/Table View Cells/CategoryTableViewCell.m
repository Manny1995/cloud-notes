//
//  CategoryTableViewCell.m
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/2/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import "CategoryTableViewCell.h"

@implementation CategoryTableViewCell

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

- (NSString *) documentString: (NSNumber *) numDocs {
    if ([numDocs intValue] == 0) {
        return @"No documents";
    }
    else if ([numDocs intValue] == 1) {
        return @"1 document";
    }
    
    return [NSString stringWithFormat:@"%@ documents", numDocs];
}

- (void)setModel:(CategoryModel *)model {
    _model = model;
    
    _titleLabel.text = model.title;
    _documentLabel.text = [self documentString:model.numDocuments];
}

@end
